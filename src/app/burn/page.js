"use client";

import { useState, useContext } from "react";
import { GlobalData } from "@/contexts/global-data";
import "@/app/burn/page.css";
import BlockText from "@/components/block-text";
import Modal from "@/components/modal";
import Image from "next/image";

export default function Burn() {
  const { config } = useContext(GlobalData);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isOpenError, setIsOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpenBurned, setIsOpenBurned] = useState(false);
  const [ticket, setTicket] = useState(0);
  const [copied, setCopied] = useState(false);

  const handlerCopy = async (e) => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget);
    await navigator.clipboard.writeText(config.wallet);
    setCopied(true);
    // alert('Copied wallet!');
  }
  const handlerSend = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/services/postTx`, {
        method: 'post',
        body: JSON.stringify({ txHash: formData.get('tx'), address: config.wallet }),
      });
      const data = await res.json();
      if(res.status === 200) {
        setIsOpenBurned(true);
      } 
      if(res.status === 409) {
        setSuccessMessage(data.message);
        setIsOpenSuccess(true);
      } else {
        setErrorMessage(data.message);
        setIsOpenError(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
      setIsOpenError(true);
    }
  }
  const handlerGet = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/services/getTicket`, {
        method: 'post',
        body: JSON.stringify({ address: formData.get('address') }),
      });
      const data = await res.json();

      if(res.status === 200) {
        setTicket(() => data.data);
        setIsOpen(true);
      } else {
        setErrorMessage(data.message);
        setIsOpenError(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
      setIsOpenError(true);
    }
  }
  return (
    <div className="container burn-page">
      <div className="burn-header">
        <BlockText title={<span className="burh-title">Let`s start<br /> with burning</span>} />
      </div>
      <form action="#" className="burn-form" onSubmit={handlerCopy}>
        <h2>Copy and send Nft</h2>
        <div className="form-inline">
          <input type="text" name="wallet" className='form-input' disabled defaultValue={config?.wallet} />
          <button type='submit' className='btn btn-orange'>{copied ? 'Copied!' : 'Copy'}</button>
        </div>
      </form>
      <form action="#" className="burn-form" onSubmit={handlerSend}>
        <h2>Paste your hash here</h2>
        <div className="form-inline">
          <input type="text" name="tx" required className='form-input' />
          <button type='submit' className='btn btn-green'>Send</button>
        </div>
      </form>
      <form action="#" className="burn-form" onSubmit={handlerGet}>
        <h2>Check your tickets</h2>
        <h3>Paste your wallet</h3>
        <div className="form-inline">
          <input type="text" name="address" required className='form-input' />
          <button type='submit' className='btn btn-yellow'>Check</button>
        </div>
      </form>
      {isOpen && <Modal setIsOpen={setIsOpen}>
        <div className="modal-container-ticket">
          <h2>You have:</h2>
          <p>{ticket}</p>
          <h2>Tickets</h2>
        </div>
      </Modal>}
      {isOpenSuccess && <Modal setIsOpen={setIsOpenSuccess}>
        <Image src="/success-modal-bg.png" width={1187} height={967} className="burn-burned" />
        <div className="modal-body">{successMessage}</div>
      </Modal>}
      {isOpenError && <Modal setIsOpen={setIsOpenError}>
        <Image src="/error-modal-bg.png" width={1187} height={967} className="burn-burned" />
        <div className="modal-body">{errorMessage}</div>
      </Modal>}
      {isOpenBurned && <Modal setIsOpen={setIsOpenBurned} className="modal-burned"><Image src="/burned.png" width={1187} height={967} className="burn-burned" /></Modal>}
    </div>
  )
}
