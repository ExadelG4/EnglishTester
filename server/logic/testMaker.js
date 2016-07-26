var q = require('q');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getCounts(test,countL) {
    var defer = q.defer();  
    var i =0;
    var pr = test.count({ level: i+1 });
    (function c(){
        pr = pr.then(function(data){
            
            if(i < 5){
                countL.push(data);
                console.log(data);
                i++;
                pr = test.count({ level: i+1 });
                c();
            }else{
                defer.resolve(countL);
            }      
        
        });
    })();
    return defer.promise;
}
function getTests(test, counts) {
    var defer = q.defer();
    var tests =[];
    var rand = getRandomArbitrary(0, counts[0]/5);
    var pr = test.find({level: 1},{'answers': 0},{skip : Math.floor(rand), limit : 1 });
    var i = 1;
    var j = 0;
    var len = counts.length;
    (function t(){
        pr = pr.then(function(data){            
            if(j < len){

                if(i < 5){
                    var edge = counts[j]/5;
                    if(data !==undefined){
                        tests.push(data[0]);
                        console.log(data);
                    }
                   
                   
                    rand = getRandomArbitrary(i*edge, (i+1)*edge);
                    pr = test.find({level: j+1},{'answers': 0},{skip : Math.floor(rand), limit : 1 });
                    i++;
                    t();
                }else{
                    tests.push(data[0]);
                    //console.log(data);
                    j++;
                    i=0;
                    t();
                }
            }else{
                defer.resolve(tests);
            }      
        
        });
    })();








    // data.forEach(function(item, i , data) {
    //         var edge = item/5;  
    //     //  randArr.push(getRandomArbitrary(i*edge, (i+1)*edge)); 
        
    // });


    return defer.promise;
}

function make(test){
    var defer = q.defer();  

    var countL = [];
    var randArr = [];
    getCounts(test,countL).then(function(data) {
        getTests(test, data).then(function(data) {
            defer.resolve(data);
        });
    }); 
    return defer.promise;
}


module.exports.make = make;