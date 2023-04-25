import React from 'react';
import styled from 'styled-components';

interface Props {
  status: string;
}

const Badge:React.FC<Props> = ({ status }) => (
  <Wrap status={status}>
    {
      (status === 'success' || status === 'pending') ? (
        <>
          {status === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          )}
          {status === 'pending' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          )}
        </>
      )
        : (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )
    }
  </Wrap>
);

const Wrap = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'success':
        return '#29b062';
      case 'pending':
        return '#939db7';
      default:
        return '#fc684e';
    }
  }};
  border-radius: 50%;
`;

export default Badge;
