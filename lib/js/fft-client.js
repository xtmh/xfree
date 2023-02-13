$(function() {
  var spectrum = document.querySelector('#Spectrum').getContext('2d');
  var result = document.querySelector('#Result').getContext('2d');
  spectrum.fillStyle = '#ffffff';
  spectrum.fillRect(0, 0, spectrum.canvas.width, spectrum.canvas.height);
  result.fillStyle = '#ffffff';
  result.fillRect(0, 0, result.canvas.width, result.canvas.height);

  $('#Slider').slider({step: 1, min: 0, max: 128});
  $('#Filter').buttonset();
  var image = new Image();
  //image.crossOrigin = "Anonymous";
  image.src = './images/tomato.jpg';
  //image.src = 'http://ytaka.html.xdomain.jp//images/tomato.jpg';
  image.addEventListener('load', function(e) {
    var w = image.width,
        h = image.height,
        re = [],
        im = [];
    try {
      FFT.init(w);
      FrequencyFilter.init(w);
      SpectrumViewer.init(spectrum);
      //apply($('input[name=filter]:checked').val());
    } catch(e) {
      alert(e);
    }

    $('#Filter').change(function(e) {
      apply(e.target.value);
    });
    $('#Slider').slider({
      change: function(e, ui) {
        apply($('input[name=filter]:checked').val());
      }
    });

    function apply(type) {
      try {
        spectrum.drawImage(image, 0, 0);
        var src = spectrum.getImageData(0, 0, w, h),
            data = src.data,
            radius = $('#Slider').slider('option', 'value'),
            viewtype = $('input[name=view]:checked').val(),
            i = 0,
            val = 0,
            p = 0;
        for(var y=0; y<h; y++) {
          i = y*w;
          for(var x=0; x<w; x++) {
            re[i + x] = data[(i << 2) + (x << 2)];
            im[i + x] = 0.0;
          }
        }
        FFT.fft2d(re, im);
        FrequencyFilter.swap(re, im);
        if(type == 'HPF') {
          FrequencyFilter.HPF(re, im, radius);
        } else {
          FrequencyFilter.LPF(re, im, radius);
        }
        if(viewtype == "0") {
          SpectrumViewer.render(re, im, true);
        } else {
          SpectrumViewer.render(re, im, false);
        }

        FrequencyFilter.swap(re, im);
        FFT.ifft2d(re, im);
        for(var y=0; y<h; y++) {
          i = y*w;
          for(var x=0; x<w; x++) {
            val = re[i + x];
            val = val > 255 ? 255 : val < 0 ? 0 : val;
            p = (i << 2) + (x << 2);
            data[p] = data[p + 1] = data[p + 2] = val;
          }
        }
        result.putImageData(src, 0, 0);
      } catch(e) {
        alert(e);
      }
    }

    function checkTypedArray() {
      try {
        var u8 = new Uint8Array(1),
            f64 = new Float64Array(1);
      } catch(e) {
        console.log(e);
      }
    }
  }, false);
});