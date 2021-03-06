
class MyFuncs{
    static getExactTime = (newTime)=>{

      let time = newTime;
      if(time/1000>1){
        time = time/1000;
        if(time/60>1){
          time = time/60;
          if(time/60>1){
            time = time/60;
            if(time/24>1){
              time = time/24;
              if(time/30>1){
                time = time/30;
                if(time/12>1){
                  time=time/12;
                  return time.toFixed(0)+' years';
                }
                else{
                  return time.toFixed(0)+' months';
                }
              } 
              else{
                return time.toFixed(0)+' days';
              }
            }
            else{
              return time.toFixed(0)+' hrs.';
            }
          }
          else{
            return time.toFixed(0)+' mins.';
          }
        }
        else{
          return time.toFixed(0)+' secs.';
        }
      }
      else{
        return time.toFixed(0)+' ms.';
      }
    };
}

module.exports = MyFuncs;