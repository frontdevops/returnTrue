# returnTrue

**Help**

![truth-table](https://raw.githubusercontent.com/frontdevops/returnTrue/master/truth-table.png)

Demo: http://codepen.io/i0z/pen/GqPKKA?editors=1010


![truth-table](https://raw.githubusercontent.com/frontdevops/returnTrue/master/truth-table-extended.png)

Demo: http://codepen.io/i0z/pen/pbGqVZ?editors=1010

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
array( 0,[Array.isArray=>x=>!x]       )
array( [].__proto__,{__proto__:[]}    )
array( x=[],x.__proto__=null,x),Object.create([]) ) // = 43
array( Array.isArray=String,[]        ) // = 23
```

## Instance
```js
function instance(x,y) {
  return x instanceof y && y instanceof x && x !== y;
}

instance(Object,Function)
instance(Object,Proxy)
```

## Instance2
```
function instance2(a,b,c) {
  return a !== b && b !== c && a !== c
      && a instanceof b
      && b instanceof c 
      && c instanceof a;
}

Object,Function,{[Symbol.hasInstance]:_=>!0}   44
a=Object,Function,{[Symbol.hasInstance]:a}     42
a=Object,Function,c=_=>_,c.__proto__=a         38
a=Object,Function,new Proxy(a,a)               32
a=Object,a.bind(),a.bind()                     26
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

wat([a]=document.all,a.id='hello',a.valueOf=_=>'world:)');
```

## Evil1
```js
var eval = window.eval;
function evil1(x) {
    return eval(x+'(x)') && !eval(x)(x);
}

evil1($=>0)
```

## Evil2
```js
var eval = window.eval;
function evil2(x) {
    return eval('('+x+')(x)') && !eval(x)(x);
}

evil2($=>x,x=0)
```

## Random1
```js
function random1(x) {
    return Math.random() in x;
}

random1((Math.random=$=>0,[0]))
random1(Math.random=$=>'call')
random1([0],Math.random=_=>0)
random1([Math.random=_=>0])
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

random3(Object.defineProperty(Uint32Array.prototype, 'length', {value: 0}))
random3(Uint32Array.prototype.__defineGetter__('length',$=>0))
```

## Random4
```js
{
	let rand = Math.random();
	function random4(x) {
	    return rand === x;
	}
}

random4(impossible)
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
		return	(x() === 1) &&
				(x.toString() === 'function () { [native code] }') &&
				(toString.call(x) === x.toString())
	}
}

function(){return 1}.bind(null)
(_=>1).bind()
```

## Instance2
```js
function instance2(x,y) {
  return x instanceof y && y instanceof x && x == y;
}

instance2(Function, Function)
instance2(x=Function, x)
```

## Minest
```js
{
  let v = parseFloat('0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001')
  
  function minest(x) {
    return x > 0 &&
           x < v &&
           x.toString().length <= 6
  }
}

minest( Number.MIN_VALUE )
```

## Reflexive2
```js
function reflexive2(x) {
	return 'number' == typeof x && x != x
}
reflexive2(NaN);
```

## Numbers
```js
function num1(a) { // new Number(1)
	return a == 1 && a instanceof Number
}

function num2(a) { // Nan
	return typeof a == 'number' && !(a instanceof Number)
}
```

## Sum1
```js
function summ1(x, y) {
	return x + y === 0.3
}
summ1(0, 0.3);
```

## Summ2
```js
function summ2(x, y) {
	return x + 0.2 === 0.3
}

summ2(0.09999999999999998);
```

## IsObject
```js
function isObject(x) {
	return (typeof x == 'object') && !(x instanceof Object)
}

isObject(null);
```

## UndefinedObject
```js
function undefinedObject(x) {
	return typeof x == 'undefined' && x instanceof Object;
}

undefinedObject(document.all);
```

## Joke
```js
function joke(s, x) {
	return s == new x(s.length +1);
}

joke(',,,', Array);
```

## Eval evil
```js
function eval_evil(x) {
	return x[x][x]("return true")();
}

eval_evil('constructor')
```

## New
```js
function _new(x) {
	return new x instanceof x;
}

_new( function(){} )
_new( class A{}    )
```

## New2
```js
function _new2(x) {
	return x() instanceof x;
}

_new2( function a(){ if(!(this instanceof a)) return new a } );
```

## New3
```js
function _new(x) {
	return x() instanceof x && x.name === '';
}

_new(function(){if(!(this instanceof arguments.callee))return new arguments.callee})
```

## Foo
```js
function foo(f) {
	var o = { x: 'x' }
	function x(x) { return this.x === o[x] }
	return f(o, x);
}

foo((o,x)=>x.bind(o,'x')())
foo((o,x)=>x.call(o,'x')())
```

### Random2.1 (if has access to global scope)
```js
var rand = Math.random();
function random21(x) {
  return rand in x;
}

random21({[rand]:1}))
```

### Date
```js
function date(x) {
    var d = new Date,
        a = [d];
    return a[x]() == d.toLocaleDateString()+', '+d.toLocaleTimeString();
}

date('toLocaleString');
```

### Nill
```js
function nil(x) {
  return (x != null) && (x <= null) && (x >= null)
}

nil(0)
```

