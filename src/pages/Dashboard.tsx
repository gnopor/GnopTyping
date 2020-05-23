import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLoading, IonInput} from '@ionic/react';
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebaseConfig'
import { useHistory } from 'react-router';
import words from '../wordlist'
import './Dashboard.css'

type WordType = {
  word: string
  done: boolean
  correct: boolean
}



const Dashboard: React.FC = () => {

    const username = useSelector((state: any) => state.user.username)
    const history = useHistory()
    const [busy, setBusy] = useState<boolean>(false);
    const inputRef = useRef<HTMLIonInputElement>(null)
    const [activeWordIndex, setActiveWordIndex] = useState(0)
    const [removeIndex, setRemoveIndex] = useState(0)
    const [activeWordList, setActiveWordList] = useState< (null | WordType) []>(
      words.slice(0,10).map(word => ({word, done: false, correct: false}))
      )


    function setInput(value: string){
      if(inputRef.current){
        inputRef.current.value = value
      }
    }

    function setInputValue(value: string){
      if(value.trim() === ''){
        setInput('')
      }else if (value[value.length - 1] === ' '){
        // main process
        // note: when a setState like the 2 below, it call provide it current state as its property by default
        setActiveWordList(list => {
          
          let wordBlocks: any = [...list]

          wordBlocks[activeWordIndex] = {
            ...wordBlocks[activeWordIndex],
            done: true,
            correct: wordBlocks[activeWordIndex].word === value.trim()
          }
          if(wordBlocks.length > 15){
            wordBlocks[removeIndex] = null
            setRemoveIndex(count => ++count)
          }          
          wordBlocks.push({word: words[wordBlocks.length], correct: false, done: false})
          return wordBlocks
        })

        setActiveWordIndex(count => {
          console.log(count)
          return count + 1
        })
        
        setInput('')
      }else{
        setInput(value)
      }
    }

    async function logout(){
      setBusy(true)
      await logoutUser()
      setBusy(false)
      history.replace('/')
    }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GnopTyping</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >
        <IonLoading message="Logging out..." duration={0} isOpen={busy}/>
        <p>Hello {username}</p>
        {activeWordList.filter(Boolean).map(block =>{
          const wordBlock = block as WordType
          const isDone = wordBlock.done
          const isCorrect = wordBlock.correct

          if(isDone && isCorrect){
            return <span className="word done correct" key={wordBlock.word}>{wordBlock.word}</span>
          }else if(isDone && !isCorrect) {
            return <span className="word done incorrect" key={wordBlock.word}>{wordBlock.word}</span>
          }


          return(<span className="word" key={wordBlock.word}>{wordBlock.word}</span>)
          })}

        <IonInput
          placeholder="Write the word!"
          ref={inputRef}
          onIonChange={(e: any) => setInputValue(e.target.value)}
        />
        
        <p><IonButton onClick={logout}> Logout </IonButton></p>

      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
