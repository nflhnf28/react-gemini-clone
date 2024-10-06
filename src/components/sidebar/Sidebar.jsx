import './sidebar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

function Sidebar() {
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const [extended, setExtended] = useState(false);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className="sidebar">

      <div className='top'>
        <img className='menu' src={assets.menu_icon} alt='' onClick={() => setExtended(prev => !prev)} />

        <div onClick={() => newChat()} className='new-chat'>
          <img src={assets.plus_icon} alt='' />
          {extended ? <p>New Chat</p> : null}
        </div>
      </div>

      {extended ? <div className='recent'>
        <p className='recent-title'>Recent</p>
        {prevPrompts.map((item, index) => {
          return (
            <div onClick={() => loadPrompt(item)} className='recent-entry'>
              <img src={assets.message_icon} alt='' />
              <p>{item.slice(0, 18)}</p>
            </div>
          )
        })}
      </div>
        : null
      }

      <div className='bottom'>
        <div className='bottom-item recent-entry'>
          <img src={assets.question_icon} alt='' />
          {extended ? <p>Help</p> : null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.history_icon} alt='' />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className='bottom-item recent-entry'>
          <img src={assets.setting_icon} alt='' />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>

    </div> /* end of sidebar */
  )
}
export default Sidebar