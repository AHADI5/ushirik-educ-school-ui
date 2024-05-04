import { SocialIcon } from "react-social-icons";
export default function ContactFooter() {
    return (
        <>
            <div className="footer flex gap-8 w-28">
                <SocialIcon fallback="facebook" url="www.facebook.com" />
                <SocialIcon fallback= "whatsapp" url="www.whatsapp.com" />
                <SocialIcon fallback="github" url="www.github.com" />
                <SocialIcon fallback ="playsore" url="www.playstore.com" />
            </div>
        </>
    )
}