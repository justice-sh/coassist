import { useContext, useEffect, useState } from 'react';
import { Form, FormProps } from './form';
import { MessageI, Worker } from '../../../types';
import * as mm from '../messageModel';
import { context } from '../../../context/context';
import { setMessages } from '../../../context/actions';
import { db } from '../../../services';

interface UpdateProps extends FormProps {
  worker: Worker;
  setWorker: (worker: Worker | null) => void;
  message: MessageI;
}

export const UpdateForm: React.FC<UpdateProps> = (props) => {
  const { message, filename, worker, setWorker } = props;
  const { dispatch, messages } = useContext(context);

  const [splitLength, setSplitLength] = useState(0);
  const [split, setSplit] = useState('');

  useEffect(() => {
    if (worker) {
      setSplit(worker.part.replace(filename, ''));
      setSplitLength(worker.splitLength);
    }
  }, [worker]);

  if (!worker) return null;

  const getPart = () => filename + split;

  const handleUpdate = (e: any, worker: Worker) => {
    e.preventDefault();

    const part = getPart();

    if (!mm.checkWorker(message.workers, part, worker)) return;

    const newWorker: Worker = {
      ...worker,
      part,
      splitLength,
    };

    const newMessage = { ...message };
    const index = message.workers.indexOf(worker);
    newMessage.workers[index] = newWorker;

    const newMessages = mm.getNewMessages(newMessage, messages);
    dispatch(setMessages(newMessages));

    db.setWorker(newWorker);
    alert('Done');
  };

  return (
    <Form>
      <form onSubmit={(e) => handleUpdate(e, worker)}>
        <div className='m-2 form-close-btn-div'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => setWorker(null)}
          >
            X
          </button>
        </div>
        <div className='m-2'>
          <div className='form-control header-splitlength-div'>
            <label className='header-label' htmlFor='splitlength'>
              {filename}
            </label>
            <input
              type='text'
              className='form-split'
              placeholder='S1'
              value={split}
              onChange={(e) => setSplit(e.target.value.trim().toLowerCase())}
              required
            />
          </div>
        </div>
        <div className='m-2'>
          <div className='form-control header-splitlength-div'>
            <label className='header-label' htmlFor='splitlength'>
              Split length (Mins):
            </label>
            <input
              type='number'
              onChange={(e) => setSplitLength(+e.target.value)}
              value={splitLength}
              className='header-splitlength'
              required
            />
          </div>
        </div>
        <div className='m-2 form-btn-div'>
          <input className='btn btn-primary' type='submit' value='Update' />
        </div>
      </form>
    </Form>
  );
};