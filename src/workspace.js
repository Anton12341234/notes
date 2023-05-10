import AlertDialog from './alert.js'
import ListItem from './listItem.js'
import Header from './header.js'
import SideBar from './sidebar.js'
import { useIndexedDB } from 'react-indexed-db';
import { useState, useEffect } from 'react';

export default function WorkSpase() {
    const { add } = useIndexedDB('notes')
    const { getAll } = useIndexedDB('notes');
    const { update } = useIndexedDB('notes');
    const { deleteRecord } = useIndexedDB('notes');
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(true);
    const [idNote, setIdNote] = useState(0);
    const [disabledDel, setDisabledDel] = useState(true);
    const [disabledText, setDisabledText] = useState(true);
    const [text, setText] = useState('');
    const [alert, setAlert] = useState(false);
    const [openSpoiler, setOpenSpoiler] = useState(true);
    const [leftPanel, setLeftPanel] = useState(true);
  
    useEffect(() => { //useEffect для получения всех заметок
      getAll().then(notesFromDB => {
        setNotes(notesFromDB.sort(function (a, b) {//функия для сортировки по дате, для полученыйх заметок
          let elA =  new Date(a.date.split(".").reverse().join(".")).getTime();
          let elB =  new Date(b.date.split(".").reverse().join(".")).getTime();
          if (elA > elB) {
            return -1;
          }
          if (elA < elB) {
            return 1;
          }
          return 0;
        }))
      },
      error => {
        console.log(error);
      })
    }, [note]);
  
    useEffect(() => {//useEffect для адаптации приложения под экран
      if(window.innerWidth<450){
        setOpenSpoiler(false)
      }
    }, []);
  
  
    useEffect(() => {//useEffect для изменения заметки
        setNote(!note)
      if(text&& !disabledText){
        update({ id: idNote, text: text, date: new Date().toLocaleString()  }).then(event =>
        error => {
          console.log(error);
        });
      }
    }, [text]);
  
    const addClick = () => {// функция создания новой заметки
      add({ id: Math.random(), text: '', date: new Date().toLocaleString() }).then(
        event => {
          console.log('ID Generated: ', event);
          setNote(!note)
          setText('')
        },
        error => {
          console.log(error);
        }
      );
    };
  
    const deleteClick = (response) => {// функция удаления заметки
      if(response){
        deleteRecord(idNote).then(event => {
            setNote(!note)
          setDisabledDel(true)
          setText('')
        },
        error => {
          console.log(error);
        });
      }
      setAlert(false)
    };
  
    const SpoilerOpen = ()=>{//открыть боковой спойлер
      setLeftPanel(false)
      setOpenSpoiler(true)
    }
  
    const SpoilerСlose = ()=>{//закрыть боковой спойлер
      setLeftPanel(true)
      setOpenSpoiler(false)
    }
  
    const onclickNote = (id)=>{// клик по заметке
      if(window.innerWidth<450){//если размер экрана меньше 450рх, то окрываем спойлер
        SpoilerOpen()
      }
      setIdNote(id)
      setDisabledDel(false)
      setNote(!note)
      notes.map(el=>{
        if(el.id===id){//ищем по id нужную нам заметку
          el.text?setDisabledText(true):setDisabledText(false)
          setText(el.text)//по клику на заметку, подставляеться текст из БД в основное поле ввода.
        }
      }) 
    }
  
    return (
      <>
        <AlertDialog open={alert} handleClose={deleteClick}/>
        <Header leftPanel={leftPanel} addClick={addClick} setDisabledText={setDisabledText} disabledDel={disabledDel} setAlert={setAlert} SpoilerСlose={SpoilerСlose}/>
        <div className='boxes'>
          {leftPanel&&<ListItem leftPanel={leftPanel} notes={notes} onclickNote={onclickNote}/>}
          {openSpoiler&&<SideBar setDisabledText={setDisabledText} disabledText={disabledText} setText={setText} text={text}/>}
        </div>
      </>
    )
  }