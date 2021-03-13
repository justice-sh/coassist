import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import List from '../commons/list';
import { Link } from 'react-router-dom';
import { capitalize } from '../util';

export interface MembersProps {}
export type MemberStatus = 'active' | 'inactive';
export type MemberType = 'TE' | 'T';
export interface MemberI {
  name: string;
  type: MemberType;
  status: MemberStatus;
}

const Members: React.FC<MembersProps> = (props) => {
  const [members, setMembers] = useState<MemberI[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState<MemberType>('T');

  const nameRef = useRef<HTMLInputElement>(null);

  const activeMembers = members.filter((m) => m.status === 'active');
  const inactiveMembers = members.filter((m) => m.status === 'inactive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = members.find((m) => m.name === name);
    if (result) return alert(`${capitalize(name)} is already a member.`);

    const newMember: MemberI = {
      name,
      type,
      status: 'inactive',
    };
    const newMembers = [...members];
    newMembers.push(newMember);
    setMembers(newMembers);
    setName('');
    nameRef.current?.focus();
  };

  const handleMark = (member: MemberI) => {
    const newMember = { ...member };
    newMember.status = newMember.status === 'active' ? 'inactive' : 'active';
    const newMembers = members.filter((m) => m.name !== member.name);
    newMembers.push(newMember);
    setMembers(newMembers);
  };

  const handleDelete = (name: string) => {
    const result = prompt('Are you sure?');
    if (result === null) return;
    const newMembers = members.filter((m) => m.name !== name);
    setMembers(newMembers);
  };

  return (
    <Section>
      <header className='header'>
        <nav className='nav'>
          <Link to='/home' className='btn btn-link'>
            back
          </Link>
        </nav>
        <form onSubmit={handleSubmit} className='form'>
          <input
            className='form-control'
            type='text'
            placeholder="member's name"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            required
            ref={nameRef}
          />
          <select
            name='type'
            id='type'
            required
            className='form-select'
            onChange={(e) => setType(e.target.value as MemberType)}
          >
            <option value='T'>T</option>
            <option value='TE'>TE</option>
          </select>
          <input className='btn btn-primary' type='submit' value='Add' />
        </form>
      </header>
      <div className='container'>
        <List
          items={inactiveMembers}
          title='inactive members'
          onMark={handleMark}
          onDelete={handleDelete}
        />
        <List
          items={activeMembers}
          title='active members'
          onMark={handleMark}
          onDelete={handleDelete}
        />
      </div>
      <div className='hide'>
        <List items={members} title='all members' />
        <List items={activeMembers} title='active members' />
        <List items={inactiveMembers} title='inactive members' />
      </div>
    </Section>
  );
};

const Section = styled.section`
  // min-width: 200px;

  .header {
    display: flex;
    padding: 10px;
    margin: 10px;
    background: gray;
    flex-wrap: wrap;
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
  .form-control {
    flex-basis: clamp(300px, 50%, 400px);
    text-transform: capitalize;
    border: 2px gray red;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .container > * {
    flex-basis: 400px;
  }
  .hide {
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid blue;
    margin: 10px;
  }

  @media print {
    .container,
    .header {
      display: none;
    }
    .hide {
      display: flex;
    }
  }
`;

export default Members;
