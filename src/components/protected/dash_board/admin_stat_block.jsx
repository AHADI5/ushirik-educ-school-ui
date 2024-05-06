import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';

export default function StatBlock({ numberAdded, numberGone, date, category, totalNumber, img  , color}) {
  return (
    <div className="bg-white shadow-md p-4">
      <div className="icon-stats flex justify-between gap-8">
        <div><img className={`bg-${color}bg-red-200 w-8 h-8` }  src={img} alt=""  /></div>
        <div className="over flex justify-center gap-3">
          <div className="added flex gap-2">
            <span><FontAwesomeIcon icon={faArrowUp} /></span>
            <span>{numberAdded}</span>
          </div>
          <div className="gone flex gap-2">
            <span><FontAwesomeIcon icon={faArrowDown} /></span>
            <span>{numberGone}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <div className="total-number text-1xl mt-3">{totalNumber}</div>
      <div className="title text-gray-400 mt-3">{category}</div>
    </div>
  );
}
