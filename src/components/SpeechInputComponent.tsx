'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useVoiceCommands } from '@/hooks/use-voice-commands';

const SpeechInputComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const { processVoiceCommand } = useVoiceCommands();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error("Web Speech API is not supported by this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      console.log('Voice recognition started.');
    };

    recognition.onresult = (event) => { // This line is crucial for correct syntax
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      setIsListening(false);
      console.log('Voice recognition finished. Transcript:', currentTranscript);

      processVoiceCommand(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Voice recognition ended.');
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [processVoiceCommand]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Button onClick={isListening ? stopListening : startListening} disabled={!recognitionRef.current}>
        {isListening ? 'Stop Listening' : 'Start Voice Input'}
      </Button>
      {transcript && (
        <p className="mt-4 text-lg">
          Recognized Text: <strong>{transcript}</strong>
        </p>
      )}
      {isListening && <p className="mt-2 text-sm text-gray-500">Listening for commands...</p>}
    </div>
  );
};

export default SpeechInputComponent;
