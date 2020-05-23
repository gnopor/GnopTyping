import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonButton, IonIcon, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import {star} from 'ionicons/icons';

const arr =[
  {
    name:'Finn',
    desc:'This is my bro',
    avatar:'https://i.guim.co.uk/img/media/e909d8da276dcaa25baca97b134d6d63e8664e75/0_36_6025_3615/master/6025.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d8d409192183fbbd783d76323c04603e'
  },
  {
    name:'Han',
    desc:'There is the bad one',
    avatar:'https://media.haircutinspiration.com/photos/20181204015357/denzel-washington-short-curls.jpg'
    },
  {
    name:'Rey',
    desc:'There is the pricess one',
    avatar:'https://www.demilked.com/magazine/wp-content/uploads/2016/07/Black-Men-Hair-1-700x989.jpg'
  }
]
const Home: React.FC = () => {

  const [input, setInput] = useState<string>('');

  useEffect(()=> {
    console.log(input);
  }, [input] )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >

      <IonButton expand='full' color='secondary'>
        <IonIcon slot='start' icon={star}></IonIcon>
        Hello World
      </IonButton>

      <IonButton expand='full' color='primary' routerLink='/Example'>
        <IonIcon slot='end' icon={star}></IonIcon>
        Go to example
      </IonButton>

      <IonInput 
        value={input} 
        onIonChange={(e: any) => setInput(e.target.value)}>

      </IonInput>






          <IonList>

          {arr.map(elem => (
              <IonItemSliding key={elem.name}>
              <IonItem>
                <IonAvatar>
                  <img src={elem.avatar}/>

                </IonAvatar>
                <IonLabel className='ion-padding'>
                  <h2>{elem.name}</h2>
                  <h3>{elem.desc}</h3>
                </IonLabel>
            </IonItem>

            <IonItemOptions side='end'>
            <IonItemOption onClick={()=> alert('Pressed delete!')}>
                  Delete
              </IonItemOption>
            </IonItemOptions>  
            </IonItemSliding>            

            ))}
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
