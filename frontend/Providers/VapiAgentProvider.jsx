"use client";
import Vapi from "@vapi-ai/web";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

// Create a context for Vapi
const VapiContext = createContext();

// VapiProvider Component
export const VapiProvider = ({ children, vapi_public_key }) => {
  const callLogRef = useRef(null);
  const [language, setLanguage] = useState("en-US");
  const [callStatus, setCallStatus] = useState("idle");
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [isCallLogOpen, setIsCallLogOpen] = useState(false);

  useEffect(() => {
    const vapiInstance = new Vapi(vapi_public_key);
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
    });
    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("speech-start", () => {
      setCallStatus("connected");
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });
    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });
    vapiInstance.on("message", (message) => {
      if (message.type === "conversation-update") {
        setTranscript(message.conversation);
      }
    });
    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [vapi_public_key]);

  return (
    <VapiContext.Provider
      value={{
        callLogRef,
        language,
        setLanguage,
        callStatus,
        setCallStatus,
        vapi,
        isConnected,
        isSpeaking,
        transcript,
        isCallLogOpen,
        setIsCallLogOpen,
      }}
    >
      {children}
    </VapiContext.Provider>
  );
};

// Custom hook to access Vapi context
export const useVapi = () => {
  const context = useContext(VapiContext);
  if (!context) {
    throw new Error("useVapi must be used within a VapiProvider");
  }
  return context;
};
