import { useLocation } from "react-router-dom";

export default function CommuniqueDetails() {
  const location = useLocation();
  const { communiqueData } = location.state;

  return (
    <div className="ml-52 mr-3 mt-20">
      
      {communiqueData && (
        <div>
            <div  className="flex justify-evenly mb-10">
                <div>
                    {communiqueData.recipients && communiqueData.recipients.length > 0 && (
                        <div>
                            <p>à :</p>
                            <ul>
                                {communiqueData.recipients.map((recipient, index) => (
                                <a href={`mailto:${recipient.email}`} className="text-blue-500 underline"><li key={index}>{recipient.email}</li></a>
                                ))}
                            </ul>
                        </div>
                    )
                    }
                    <p>Reach: {communiqueData.recipientType}</p>
                    <p>ID: {communiqueData.id}</p>
                </div>
                <p>Published Date: {communiqueData.publishedDate}</p>
            </div>
            
            <div className="message-body ml-44 ">
                <p className="underline pb-4 "> Object  : {communiqueData.title}</p>
                <p className="text-balance">{communiqueData.content }</p>
                
            </div>

            

          
         
          
          

          {/* Check if recipients array exists before displaying */}
       
        </div>
      )}
    </div>
  );
}
