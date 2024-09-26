import React from 'react'

interface Props{
    label:String;
    value:number;
}
const TimerComponent:React.FC<Props> = ({label,value}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 text-white font-babes'>
      <p className="text-xl md:text-4xl font-extrabold">{value}</p>
      <p className="uppercase text-orange-600 font-[800]">{label}</p>
    </div>
  )
}

export default TimerComponent
