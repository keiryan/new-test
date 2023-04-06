import "./App.css";
import callOpenAI from "./chat";
import { useState, useEffect } from "react";
import axios from "axios";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import env from "react-dotenv";
// import useSound from 'use-sound';
// import SoundPlayer from 'react-native-sound-player';
import {
  Container,
  MessagesContainer,
  UserMessageContainer,
  UserMessage,
  BotMessageContainer,
  BotMessage,
  LoadingBallsContainer,
  LoadingBallsMessage,
  AudioHolder
} from "./app.styles.js";
import UserInput from "./components/User Input/input";
import LoadingBalls from "./components/Loading Balls/loadingballs";

const ChatMessages = ({ messages, loading }) => {
  return (
    <MessagesContainer>
      {messages.map((message) => {
        if (message.role === "user") {
          return (
            <UserMessageContainer key={message.messageID}>
              <UserMessage>{message.content}</UserMessage>
            </UserMessageContainer>
          );
        } else {
          return (
            <BotMessageContainer key={message.data.id}>
              <BotMessage>{message.data.choices[0].message.content}</BotMessage>
            </BotMessageContainer>
          );
        }
      }
      )}
      <LoadingBallsContainer loading={loading} key={Math.random()}>
        <LoadingBallsMessage>
          <LoadingBalls />
        </LoadingBallsMessage>
      </LoadingBallsContainer>
    </MessagesContainer>
  );
};

function App() {
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [exampleBlob, setExampleBlob] = useState(null);

  const ContainingDiv = document.getElementById("container");

  const getData = async ({ content }) => {
    console.warn("getting data");
    setLoading(true);
    const newMessagesArray = [...messages, { content, role: "user" }]
    const response = await callOpenAI(newMessagesArray);

    // const voiceResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech/uuDVroKftU2MssWHau5l', {
    //   method: 'POST',
    //   headers: {
    //     'accept': '*/*',
    //     'Content-Type': 'application/json',
    //     'xi-api-key': 'b1b5f5a656111687a51a378b004852fa',
    //   },
    //   body: JSON.stringify({
    //     'text': response.data.choices[0].message.content,
    //     'voice_settings': {
    //       'stability': 0,
    //       'similarity_boost': 0
    //     }
    //   })
    // });


    // setAudio(voiceResponse.data);
    // const reader = voiceResponse.body.getReader();
    // const audioChunks = [];
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   audioChunks.push(value);
    // }
    // Combine the audio chunks into a single Blob
    // const audioBlob = new Blob(audioChunks);
    // Create an AudioContext and decode the audio data
    // const audioContext = new AudioContext();
    // const audioBuffer = await audioContext.decodeAudioData(await audioBlob.arrayBuffer());
    // Play the audio
    // const audioSource = audioContext.createBufferSource();
    // audioSource.buffer = audioBuffer;
    // audioSource.connect(audioContext.destination);
    // audioSource.start(0);
    //Wait for the reader to end before resolving the promise
    // await reader.closed;
    // console.log('Audio stream has ended');

    // voiceResponse.data.play();
    // setAudio(audioUrl);
    setLoading(false);
    setMessages([...newMessagesArray, { ...response }]);
  };

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    // const url = URL.createObjectURL(blob);
    // transcribeAudio(blob);
    // setExampleBlob(blob)
    // const audio = document.createElement('audio');
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };

  const transcribeAudio = async (audioBlob) => {
    const openaiApiKey = env.OPENAI_API_KEY; // Replace with your actual API key
    const apiUrl = "https://api.openai.com/v1/audio/transcriptions";

    const formData = new FormData();
    formData.append("file", new File([audioBlob], "audio.mp3"));
    formData.append("model", "whisper-1");

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${openaiApiKey}`,
        },
      });

      console.log(response)

      console.warn('Whispered back:', response.data.text);
      await getData({ content: response.data.text });
    } catch (error) {
      console.log(error)
      console.error(`Error: ${error}`);
    }
  };

  const addMessage = (message) => {
    setMessages((messages) => [...messages, message]);
    getData(message);
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify([...messages]));
    ContainingDiv?.scrollTo(0, ContainingDiv.scrollHeight);
  }, [messages, ContainingDiv]);

  console.log(audio);

  return (
    <Container id="container">
      <ChatMessages messages={messages} loading={loading} />
      <AudioHolder>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
        />
      </AudioHolder>

      <UserInput addMessage={addMessage} />
      {/* <button onClick={() => transcribeAudio(exampleBlob)}>Hello</button> */}
    </Container>
  );
}

export default App;
