export default function Index(){
    const onClickHandler = () => {
        console.log("Hola mundo")
    }


    return(<div className="bg-white text-black h-full p-8 m-8">
        <h1>Hola mundo</h1>
        <button className="border shadow border-black" onClick={onClickHandler}>Test buttom</button>
    </div>)
    
}