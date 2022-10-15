import { useRef, useState } from 'react';
import './modal.component.css';

export const ModalComponent = ({onCreateUser, toggleModalShow}) => {
    const modalBackgroundRef = useRef();
    const [focused, setFocused] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const closeModal = (e) => {
        if(e.target === modalBackgroundRef.current) {
            toggleModalShow(false)
        }
    }

    const createUser = () => {
        setFocused(true);
        const valid = () => {
            return Object.values(form).every((field) => field)
        }
        if(valid()) {
            onCreateUser(form);
            toggleModalShow(false);
        }
    }

    return (
        <>
            <div ref={modalBackgroundRef} onClick={closeModal} className='modal-component-background'>
                <div className="modal-component-container">
                    <div className="modal-component-profile-circle">
                        <div style={{ width: '25px', height: '25px', borderRadius: '50%', margin: 'auto auto 0', background: 'var(--light-green)' }}></div>
                        <div style={{ width: '50px', height: '25px', borderTopLeftRadius: '75%', borderTopRightRadius: '75%', background: 'var(--light-green)', margin: '0 auto auto'}}></div>
                    </div>
                    <input className={focused && !form.name ? 'invalid' : ''} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='Name'/>
                    <input className={focused && !form.phone ? 'invalid' : ''} type='number' value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder='Phone'/>
                    <input className={focused && !form.email ? 'invalid' : ''} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='Email'/>
                    <input className={focused && !form.address ? 'invalid' : ''} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder='Address'/>
                    <button onClick={createUser} style={{ background: 'var(--light-green)', width: '100px', margin: '20px auto' }}>Create</button>
                </div>
            </div>
        </>
    )
}
