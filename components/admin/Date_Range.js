import {DateRangeInput} from '@datepicker-react/styled'
import connect from 'react-redux'
const newDate = new Date();
const initialState = {
  startDate: newDate,
  endDate: newDate,
  focusedInput: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return {
        ...state, 
        focusedInput: action.payload
      }
   
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}


function DatePickerNew() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <React.Fragment>
    <DateRangeInput
      onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
      onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
      startDate={state.startDate} // Date or null
      endDate={state.endDate} // Date or null
      focusedInput={state.focusedInput} // START_DATE, END_DATE or null
    />
    </React.Fragment>
  )
}

function mapStateToProps(state){
    return{
        tanggal : state.tanggal
    }
}
export default connect(mapStateToProps)(DatePickerNew);