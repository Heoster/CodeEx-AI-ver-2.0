import { useCallback } from 'react';

// Define the shape of a command
interface VoiceCommand {
  command: string | RegExp; // The phrase to listen for, or a regex pattern
  action: string; // A unique identifier for the action
  handler: (...args: any[]) => void; // The function to execute
}

// Dummy functions for actions - you'd replace these with your actual app logic
const openSettings = () => {
  console.log("Action: Opening settings dialog...");
  // Example: router.push('/settings') or open a modal
  alert("Opening settings!");
};

const goBack = () => {
  console.log("Action: Navigating back...");
  // Example: router.back()
  alert("Going back!");
};

const submitForm = () => {
  console.log("Action: Submitting the current form...");
  // Example: document.querySelector('form').submit()
  alert("Submitting form!");
};

const clearInput = () => {
  console.log("Action: Clearing input...");
  alert("Clearing input!");
};

// Define your list of commands
const voiceCommands: VoiceCommand[] = [
  { command: "open settings", action: "openSettings", handler: openSettings },
  { command: "go back", action: "goBack", handler: goBack },
  { command: "submit form", action: "submitForm", handler: submitForm },
  { command: "clear input", action: "clearInput", handler: clearInput },
  // More advanced: using a RegExp for partial matches or variations
  { command: /^(open|show|display) (my )?profile$/, action: "openProfile", handler: () => alert("Opening profile!") },
];

export const useVoiceCommands = () => {
  const processVoiceCommand = useCallback((transcript: string) => {
    const lowerCaseTranscript = transcript.toLowerCase().trim();
    console.log("Processing transcript:", lowerCaseTranscript);

    for (const cmd of voiceCommands) {
      if (typeof cmd.command === 'string') {
        if (lowerCaseTranscript.includes(cmd.command)) {
          console.log(`Command recognized: "${cmd.command}"`);
          cmd.handler();
          return cmd.action; // Return the action name if a command is found
        }
      } else if (cmd.command instanceof RegExp) {
        if (cmd.command.test(lowerCaseTranscript)) {
          console.log(`Regex command recognized: "${cmd.command}"`);
          cmd.handler();
          return cmd.action; // Return the action name if a command is found
        }
      }
    }
    console.log("No command recognized for:", lowerCaseTranscript);
    return null; // No command found
  }, []);

  return { processVoiceCommand, voiceCommands };
};
