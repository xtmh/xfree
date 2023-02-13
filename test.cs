
using System;
using System.Linq;
using System.Text;

//↓を追加
using System.Collections;
using System.Collections.Generic;

public class Hello{
    static IEnumerable<int> Enumerable(int num)
    {
        yield return (num *= 2);
        yield return (num *= 2);
        yield return (num *= 2);
    }

    static IEnumerator<int> Iterator(int num)
    {
        yield return (num *= 2);
        yield return (num *= 2);
        yield return (num *= 2);
    }

    static void Main(string[] args)
    {
        IEnumerable<int> enumerable = Enumerable(2);
        IEnumerator<int> iter = Iterator(2);

        foreach(var n in enumerable)
        {   Console.WriteLine(n);   }

        while(iter.MoveNext())
        {   Console.WriteLine(iter.Current);    }

        Console.ReadLine();
    }
}
