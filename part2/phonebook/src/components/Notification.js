export default function Notification({message}) {
   
   if(message === null) {
       return null
   }
 
  return (
    <div className={message.type}>
        <p>{message.content}</p>
    </div>
  )
}
