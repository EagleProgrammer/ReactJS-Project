import React, {useState} from 'react';
import QRCode from 'qrcode.react';
function Forms() {
    const [g1,setG1]=useState(0);
    const [g2,setG2]=useState(0);
    const [g3,setG3]=useState(0);
    const [g4,setG4]=useState(0);
    const [g5,setG5]=useState(0);
    const [g6,setG6]=useState(0);
    const [g7,setG7]=useState(0);
    const [showQR,setShowQR]=useState(false);
    const[showTable,setShowTable]=useState(false);
    const[customers,setCustomers]=useState([])
    const [UPIAmount,setAmount]=useState(0);
    const[showbill,setShowbill]=useState(false);
    const upi=`upi://pay?pa=${encodeURIComponent("hiritish@okhdfcbank")}&am=${UPIAmount}&cu=INR`;
    const items = [
        {itemno:1,itemname:"White Chocolate",cost:20,quantity:g1},
        {itemno:2,itemname:"Milk Chocolate",cost:40,quantity:g2},
        {itemno:3,itemname:"Ferror Rocher",cost:200,quantity:g3},
        {itemno:4,itemname:"Lindit",cost:400,quantity:g4},
        {itemno:5,itemname:"Fruit N' Nut",cost:10,quantity:g5},
        {itemno:6,itemname:"Waffers",cost:5,quantity:g6},
        {itemno:7,itemname:"Muffins",cost:10,quantity:g7}
    ];
    function increment(itemno)
    {
        setShowQR(false)
        setShowbill(false)
        document.getElementById("totalcost").innerHTML=""
        if (itemno==1)
        {
            setG1(prevg1=>prevg1+1)
        }
        else if(itemno==2)
        {
            setG2(prevg2=>prevg2+1)
        }
        else if(itemno==3)
        {
            setG3(prevg3=>prevg3+1)
        }
        else if(itemno==4)
        {
            setG4(prevg4=>prevg4+1)
        }
        else if(itemno==5)
        {
            setG5(prevg5=>prevg5+1)
        }
        else if(itemno==6)
        {
            setG6(prevg6=>prevg6+1)
        }
        else if(itemno==7)
        {
            setG7(prevg7=>prevg7+1)
        }
        

    }
    function decrement(itemno)
    {
        setShowbill(false)
        setShowQR(false)
        document.getElementById("totalcost").innerHTML=""
        if (itemno==1 && g1>0)
        {
            setG1(prevg1=>prevg1-1)
        }
        else if(itemno==2 && g2>0)
        {
            setG2(prevg2=>prevg2-1)
        }
        else if(itemno==3 && g3>0)
        {
            setG3(prevg3=>prevg3-1)
        }
        else if(itemno==4 && g4>0)
        {
            setG4(prevg4=>prevg4-1)
        }
        else if(itemno==5 && g5>0)
        {
            setG5(prevg5=>prevg5-1)
        }
        else if(itemno==6 && g6>0)
        {
            setG6(prevg6=>prevg6-1)
        }
        else if(itemno==7 && g7>0)
        {
            setG7(prevg7=>prevg7-1)
        }
    }
    function submit()
    {
        setShowTable(false);
        var totcost=0;
        for (let i=0;i<7;i++)
        {
            totcost=totcost+(parseInt(items[i].cost))*(parseInt(items[i].quantity))
        }
        
        var phone=0;
        phone=parseInt(document.getElementById("phone").value);
        if(phone<1000000000)
        {
            alert("Enter a valid phone number!!!")
        }
        else if(!phone)
        {
            alert("Enter a valid phone number!!!")
        }
        else if (totcost>0) 
        {
            const existing=customers.findIndex(c => c.phoneno === phone);
            if (existing!==-1) 
            {
                const updated=[...customers];
                updated[existing].cost+=totcost;
                setCustomers(updated);
            } 
            else 
            {
                setCustomers(previouscustomer=>[...previouscustomer,{phoneno:phone,cost:totcost}]);
            }
            document.getElementById("totalcost").innerHTML="The total cost is "+totcost;
            setShowQR(true);
            setAmount(totcost);
            setShowbill(true);
            setBill([{CPhone:phone,CEmail:email,1:items[0].quantity,2:items[1].quantity,3:items[2].quantity,4:items[3].quantity,5:items[4].quantity,6:items[5].quantity,7:items[6].quantity}])
        }
        else if(totcost==0)
        {
            alert("Don't you want any chocolates?? :(")
        }

    }
    function reset()
    {
        setG1(0);
        setG2(0);
        setG3(0);
        setG4(0);
        setG5(0);
        setG6(0);
        setG7(0);
        setShowQR(false);
        setShowTable(false);
        setShowbill(false);
        document.getElementById("phone").value = '';
        document.getElementById("totalcost").innerHTML="";
        
    }
    function employee()
    {
        document.getElementById("totalcost").innerHTML=""
        setShowQR(false)
        setShowbill(false);
        var pas=window.prompt("Enter the password");
        if (pas=="LeoEmployees")
        {
            setShowTable(true);
        }
        else
        {
            alert("Wrong Password!")
        }
    }

    const listitems = items.map(item => (<li className="listborder" key={item.itemno}>Name: {item.itemname}   Cost: {item.cost}   Quantity: {item.quantity}
    <br></br>
    <button onClick={()=>increment(item.itemno)} className="ibutton">+</button>
    <button onClick={()=>decrement(item.itemno)} className="dbutton">-</button>
    </li>
    ));

    return (
        <div className="background">
            <h1><center>LEO CHOCOLATES</center></h1>
            <center><marquee>Welcome to LEO Chocolates. Choose the chocolates that you want and press submit. Pay using UPI/Card. A receipt will be printed as soon as the payment has been done. Show this at the delivery counter to get your chocolates. All prices mentioned are per 100g Have a nice day:)</marquee></center>
            <div className="centering">
                <div className="forms">
                    <img src="LeoCoin2.jpg" className="spinimage"/>
                    <center><h2>Billing</h2></center>
                    <marquee className="billm">A quantity of 1 refers to 100g</marquee>
                    <ol>{listitems}</ol>
                    <label>Customer's Phone Number:</label>
                    <input type="text" maxLength="10" id="phone"></input>
                    <br/>
                    <br/>
                    <button type="submit" onClick={submit} className="submit">Submit</button>
                    <button onClick={reset} className="reset">Reset</button>
                    <br/>
                    <br/>
                    <button onClick={employee} className="employee">Employee Only</button>
                    <br/>
                    <p id="totalcost"></p>
                    {showQR ?(<QRCode value={upi} className="QR"/>):null}
                    {showTable ? (
                        <center>
                            <table className="details">
                                <tr>
                                    <th>Phone Number</th>
                                    <th>Total amount spent by user</th>
                                </tr>
                                    {customers.map(c=> 
                                <tr id={c.phoneno}>
                                    <td>{c.phoneno}</td>
                                    <td>{c.cost}</td>
                                </tr>)}
                            </table>
                        </center>
                    ):null}
                    {showbill?(
                        <center>
                            <h2>Bill Details</h2>
                                <table>
                                    
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Cost</th>
                                    </tr>
                
                                {items.map(item => (
                                    <tr key={item.itemno}>
                                        <td>{item.itemname}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.cost*item.quantity}</td>
                                    </tr>
                                    

                                ))}
                                    <tr>
                                        <td colspan="2">Total</td>
                                        <td>
                                            {
                                                (() => {
                                                    let total=0;
                                                    for (let i=0;i<items.length;i++) 
                                                    {
                                                        total+=items[i].cost*items[i].quantity;
                                                    }
                                                    return total;
                                                })()
                                            }
                                        </td>
                                    </tr>
                
                                </table>

                        </center>
                    ):null}
                </div>
            </div>
        </div>
    );
}

export default Forms
