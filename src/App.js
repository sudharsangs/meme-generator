import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Meme from './components/Meme';
import styles from './App.module.css'


const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key,value]) => `${key}=${value}`)
    return '?' + params.join('&')
    return '?'
}

function App() {

    const [templates,setTemplates] = useState([]);
    const [template,setTemplate] = useState(null);
    const [topText,setTopText] = useState('');
    const [bottomText,setBottomText] = useState('');
    const [meme,setMeme] = useState(null);

    const url = 'https://api.imgflip.com/get_memes';

    useEffect(() => {
       getTemplates();

    },[])

    const getTemplates = async () => {
        const response = await axios.get(url);
        console.log(response);
        setTemplates(response.data.data.memes);
        console.log(response.data.data.memes);
    }

    if(meme){
        return(
            <div className={styles.App}>
                <img src={meme} className={styles.imgClass} alt="Custom Meme"/>
            </div>
        )
    }
     return(
        <div className={styles.App}>
            {template && (
                <>
                    <form className={styles.frmClass} onSubmit = {async e => {
                        e.preventDefault();
                        const params = {
                            template_id : template.id,
                            text0: topText,
                            text1: bottomText,
                            username: 'devsudo',
                            password: 'itisvisible'
                        }
                        const res = await axios.post(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`);
                        setMeme(res.data.data.url);
                    }}>
                        <Meme className={styles.memes}template={template}/>
                        <input 
                            type="text" 
                            placeholder="Top Text" 
                            value={topText} 
                            onChange={e => 
                                setTopText(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Bottom Text" 
                            value={bottomText} 
                            onChange={e => 
                                setBottomText(e.target.value)}/>
                        <button type="submit">Create Meme</button>

                    </form>
                </>
            )}
            {
               !template && ( 
                   <>
                   <h1>Pick a Template</h1>
                   {templates.map(template => {
                    return (
                     <Meme 
                        className={styles.memes}
                        template={template}
                        onClick={() => {
                            setTemplate(template);
                        }}
                     />
                    );
                })}
            </>)}
        </div>
    );
}


export default App;