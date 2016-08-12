# returnTrue

**Help**

![truth-table](https://raw.githubusercontent.com/frontdevops/returnTrue/master/truth-table.png)

Demo: http://codepen.io/i0z/pen/GqPKKA?editors=1010

----

## Reflexive

```js
function reflexive(x) {
    return x != x;
}

reflexive(NaN)
```

## Transitive
```js
function transitive(x,y,z) {
    return x && x == y && y == z && x != z;
}

transitive([],0,[]) 
```

## Counter
```js
function counter(f) {
    var a = f(), b = f();
    return a() == 1 && a() == 2 && a() == 3
        && b() == 1 && b() == 2;
}

counter((x=1)=>$=>x++)
counter(x=>$=>x=-~x)   // -2 symbols
```

## Peano

`chrome 54`

```js
function peano(x) {
    return (x++ !== x) && (x++ === x);
}

peano(2**53-1)
```

## Array
```js
function array(x,y) {
    return Array.isArray(x) && !(x instanceof Array) &&
          !Array.isArray(y) &&  (y instanceof Array);
}

array( a=Array.prototype,{__proto__:a})
array( (Array.isArray=x=>x[0],'1'),[] )
array( '1',[],Array.isArray=x=>x[0]   )
array( Array.isArray=x=>x.length,[]   )
array( Array.isArray=$=>x--,[],x=1    )
```

## Instance
```js
function instance(x,y) {
  return x instanceof y && y instanceof x && x !== y;
}

instance(Object,Function)
```

## Proto1
```js
function proto1(x) {
    return x && !("__proto__" in x);
}

proto1(Object.create(null))
proto1({__proto__:null})
```

## Undef
```js
function undef(x) {
    return !{ undefined: { undefined: 1 } }[typeof x][x];
}

undef((Object.prototype['number']=0,0))
undef(document.all)
```

## Symmetric
```js
function symmetric(x,y) {
    return x == y && y != x;
}

symmetric(1,{valueOf:$=>n=-~this.n})
symmetric(n=1,{valueOf:$=>n++})
```

## Ouroborobj
```js
function ouroborobj(x) {
    return x in x;
}

ouroborobj([0])
```


## Truth
```js
function truth(x) {
    return x.valueOf() && !x;
}

truth((Number.prototype.valueOf=$=>1,0))
truth('',''.__proto__.valueOf=_=>1)
truth(0,0..__proto__.valueOf=_=>1)
```

## Wat
```js
function wat(x) {
    return x('hello') == 'world:)' && !x;
}

▶ wat(????)
```

## Evil1
```js
var eval = window.eval;
function evil1(x) {
    return eval(x+'(x)') && !eval(x)(x);
}

▶ evil1(????)
```

## Evil2
```js
var eval = window.eval;
function evil2(x) {
    return eval('('+x+')(x)') && !eval(x)(x);
}

▶ evil2(????)
```

## Random1
```js
function random1(x) {
    return Math.random() in x;
}

random1((Math.random=$=>0,[0]))
random1(Math.random=$=>'call')
random1([0],Math.random=_=>0)
```

## Random2
```js
{
	let rand = Math.random();
	function random2(x) {
	  return rand in x;
	}
}

random2(new Proxy({},{has:$=>$}))
```

### Random2.1 (if has access to global scope)
```js
var rand = Math.random();
function random21(x) {
  return rand in x;
}

random21({[rand]:1}))
```

## Random3
```js
var key = crypto.getRandomValues(new Uint32Array(4));
function random3(x) {
    var d = 0;
    for (var i=0; i<key.length; i++) {
        d |= key[i] ^ x[i];
    }
    return d === 0;
}

▶ random3(????)
```

## Random4
```js
{
	let rand = Math.random();
	function random4(x) {
	    return rand === x;
	}
}

random4(????)
```

----

# New my level :)

## Greaterself
```js
function greaterself(x) {
    return x > 8 && 8 > x;
}

greaterself({n:0,valueOf:function(){return++this.n%2?9:7}})
greaterself({valueOf:$=>(n=-~this.n)%2?9:7})
```

## Closure
```js
function closure(x) {
    return x[x] == x;
}

closure([0]);
```

## Any
```js
function any(x) {
    return x - 1 === x + 1
}

any(2**54)
any(1/0)
```

## Isarray
```js
function isarray(x) {
    return Array.isArray(x) && x instanceof Array && x.map === undefined
}

isarray(new Proxy([],{get:(o,p)=>p=='map'?void 0:o[p]}))
```

## Brainfuck
```js
function brainfuck(x) {
	return x(/2/ << /3/) === 16;
}

brainfuck((RegExp.prototype.valueOf=function(){return this.source},x=>x))
```

## Native code
```js
{
	const toString = Function.prototype.toString;
	function native(x) {
		return	(x() === 8) &&
				(x.toString() === 'function () { [native code] }') &&
				(toString.call(x) === x.toString())
	}
}

native( function(){return 8}.bind(null) );
```
