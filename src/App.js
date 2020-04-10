import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Meme from './components/Meme'

function App() {

    const [templates,setTemplates] = useState([]);
    const [template,setTemplate] = useState(null);
    const [topText,setTopText] = useState('');
    const [bottomText,setBottomText] = useState('');

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
     return(
        <div>
            {template && (
                <>
                    <form onSubmit = {async e => {
                        e.preventDefault();
                        const params = {
                            template_id : template.id,
                            text0: topText,
                            text1: bottomText,
                            username: process.env.REACT_APP_IMGFLIP_USERNAME,
                            password: process.env.REACT_APP_IMGFLIP_PASSWORD
                        }
                        const res = await axios.post('https://api.imgflip.com/caption_image')
                    }}>
                        <Meme template={template}/>
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