console.log('hello');
function p(a, level) {

    if (level === 0) {
        a.push('0');
        return a;
    }

    a = p(a, level - 1);

    var cnt = Math.pow(2, level-1);
    var n = a.length - cnt;

    for ( i = 0 ; i < cnt; ++i ) {
        a.push( a[n + i] + 'L');
        a.push( a[n + i] + 'R');
    }
    
    return a;
}

a = p([], 3);
a.forEach(x => console.log(x));
