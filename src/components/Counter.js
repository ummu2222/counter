import React,{useState , useEffect} from 'react';
import Loader from './Loader';


const Counter = () =>{

    const [n,setn] = useState(1);
//    const [flg , setFlg] = useState(0);
    const [maxn,setMaxn] = useState(1000);

    useEffect(() => {

        if(n===null)
        {
            setn(1);
        }
        
        const get_from_back = async () =>{
            const response = await fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/umang.json');
            const val = await response.json();
            
            if(val!==null)
            {
                await setn(parseInt(val));
            }
        }

        get_from_back();

    }, []); 

    useEffect(() => {

        
        if(n===null)
        {
            setn(1);
        }
        if(n>=maxn)
        {
            setn(maxn);
        }
        if(n<=(-maxn))
        {
            setn(-maxn);
        }
        
        const update_in_back = async () =>{
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ umang : n })
            };

            const response = await fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', requestOptions);
            const val = await response.json();
            
        }

        update_in_back();    
       

    }, [n]); 


    const decrement = () =>{
        if(n=== (-maxn))
        {
            setn(-maxn);
        }
        else 
            setn(n-1);
    }

    const increment = () =>{
        if(n >= maxn)
        {
            setn(maxn);
        }
        else
            setn(n+1);

    }



    return(
        <div className="counter">
            
           <div className="upper-text" >
               <div className="load">
                    <Loader/>
               </div>
                
               <p >Saving Counter value</p>
           </div>
           <div className="box">
               <button className="minus" onClick={()=>decrement()} > - </button>
               <input 
                    type="number" 
                    onChange={(e)=>setn(parseInt(e.target.value))}
                    value={n}
                />
               <button className="plus" onClick={()=>increment()}> + </button>
           </div>
           <p className="lower-text">Counter value : {n}</p>
        </div> 
        
        
    );

}

export default Counter;