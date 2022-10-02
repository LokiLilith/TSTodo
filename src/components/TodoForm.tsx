import React, { useRef } from 'react'

interface TodoFormProps {
  onAdd(title: string): void
}

export const TodoForm: React.FC<TodoFormProps> = ({onAdd}) => {
  // const [title, setTitle] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value)
  // }

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onAdd(ref.current!.value)
      ref.current!.value = ''
      // console.log(title)
      // setTitle('')
    }
  }

  return (
    <div className="input-field mt2">
      <input
        // onChange={changeHandler}
        // value={title}
        ref={ref}
        type="text"
        id="title"
        placeholder="Inserisci il titolo"
        onKeyPress={keyPressHandler}
      />
      <label htmlFor="title" className="active">
      Inserisci il titolo
      </label>
    </div>
  )
}
