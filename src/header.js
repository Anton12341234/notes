import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Header({leftPanel,addClick,SpoilerСlose,setDisabledText,setAlert,disabledDel}){
    return(<>
    <div className='header_panel'>
          {leftPanel?<button className='button_add' onClick={addClick}><AddIcon />
          </button>:<button className='button_add' onClick={SpoilerСlose}><ArrowBackIcon /></button>}
          <button disabled={disabledDel} className='button_del' onClick={()=>setAlert(true)}><DeleteOutlineIcon /></button>
          <button disabled={disabledDel} className='button_edit' onClick={()=>setDisabledText(false)}><EditNoteIcon /></button>
          <input 
            className='search' 
            placeholder="Search">
            </input>
    </div></>)
  }
  