import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLoading} from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {loginUser} from '../firebaseConfig'
import {toast} from '../toast';
import { useDispatch } from 'react-redux';
import { setUserState } from '../redux/action';


const Login: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [busy, setBusy] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  async function login(){
    setBusy(true)
    const res: any = await loginUser(username, password)
    console.log(`${res ? 'Login success': 'Login failed'}`)
    if (res) {
      dispatch(setUserState(res.user.email))
      history.replace('/dashboard')
      toast('You have logged in!')
    }
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GnopTyping - Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait.." duration={0} isOpen={busy}/>
      <IonContent className="ion-padding" >

      <IonInput 
        placeholder="Username"
        onIonChange={(e: any) => setUsername(e.target.value)}
      />
      <IonInput 
        placeholder="Password"
        onIonChange={(e: any) => setPassword(e.target.value)}
      />

      <IonButton onClick={login}>Login</IonButton>

      <p>
        New here? <Link to="/register">Register</Link>
      </p>
          
      </IonContent>
    </IonPage>
  );
};

export default Login;
