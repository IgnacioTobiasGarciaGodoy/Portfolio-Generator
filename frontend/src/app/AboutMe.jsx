

export default function AboutMe(props) {
    const text = {
        mainText: {
            text: "Hola soy usuario",
            isBlack: true,
            size: 20
        },
    
        userImage: {
            image: "image",
    
        },
    
        auxText: {
            text: "soy un desarrollador backend",
            isBlack: false,
            size: 10
        }
    }

    return (
        <div>
            <p font-weight={props.mainText.isBlack}>{props.mainText.text}</p>
            <img src={props.userImage.image} alt="user image"></img>
            <p font-weight={props.auxText.isBlack}>{props.auxText.text}</p>
        </div>
    )
}


