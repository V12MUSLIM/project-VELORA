// src/components/ChatTriggerButton.jsx
import { Button } from "@heroui/react";

// An icon for our chat button
const GeminiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5.25C12 4.83579 11.6642 4.5 11.25 4.5C10.8358 4.5 10.5 4.83579 10.5 5.25V6H12V5.25Z" fill="currentColor"/>
    <path d="M6 12C6 11.5858 5.66421 11.25 5.25 11.25C4.83579 11.25 4.5 11.5858 4.5 12C4.5 12.4142 4.83579 12.75 5.25 12.75H6V12Z" fill="currentColor"/>
    <path d="M12 18C12 18.4142 11.6642 18.75 11.25 18.75C10.8358 18.75 10.5 18.4142 10.5 18V18.75H12V18Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.125 7.5H7.5V10.125H10.125V7.5ZM6 6V11.625H11.625V6H6Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.5H13.875V10.125H16.5V7.5ZM12.375 6V11.625H18V6H12.375Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.125 13.875H7.5V16.5H10.125V13.875ZM6 12.375V18H11.625V12.375H6Z" fill="currentColor"/>
    <path d="M15.1875 12.75C14.0829 12.75 13.1875 13.6454 13.1875 14.75C13.1875 15.8546 14.0829 16.75 15.1875 16.75C16.2921 16.75 17.1875 15.8546 17.1875 14.75C17.1875 13.6454 16.2921 12.75 15.1875 12.75Z" fill="currentColor"/>
  </svg>
);


export const ChatTriggerButton = ({ onPress }) => {
  return (
    <Button
      color="primary"
      size="lg"
      isIconOnly
      onPress={onPress}
      className="fixed bottom-8 right-8 z-50 rounded-full h-16 w-16 shadow-lg"
      aria-label="Ask Gemini"
    >
      <GeminiIcon />
    </Button>
  );
};