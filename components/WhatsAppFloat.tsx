import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
export default function WhatsAppFloat() { return <a className="whatsapp-float" href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hello Buko Made Global Concept, I would like to enquire about medical equipment.")}`} target="_blank" rel="noreferrer" aria-label="Chat with Buko Made on WhatsApp"><MessageCircle size={22} /><span>Chat with us</span></a>; }
