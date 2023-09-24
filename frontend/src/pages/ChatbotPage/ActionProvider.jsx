import React from 'react';
import { createClientMessage } from 'react-chatbot-kit';

var isLender = true
localStorage.setItem("toSendLocal", '')
localStorage.setItem("userKakaoCaptureURL", '')

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  // 처음으로
  const startAfterButton = () => {
    const botMessage = createChatBotMessage(
      "빌림인지 빌려줌인지? 먼저 해야됨", { widget: 'lendborrowbutton'}
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const toFirst = () => {
    const botMessage = createChatBotMessage(
      "님 안녕하세요?\n궁금한게 있다면 '질문하기'를 보내보세요\n\n휙봇과 대화하며\n차용증을 작성할 수 있습니다.\n\n다시 시작하고 싶다면\n'처음으로'를 보내보세요\n\n다음의 항목들에 하나씩 답변해주세요!",
    );
    const botMessageSecond = createChatBotMessage('빌림 or 빌려줌', {
      widget: 'lendborrowbutton',
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessageSecond],
    }));
  };

  // 빌려줌
  const handleILend = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
    if (!userButtons[0]) {
      isLender = true;
      userButtons.push('iLend')
      localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
      const clientmessage = createClientMessage('빌려주기');
      const botMessage = createChatBotMessage(
        '대화형할지 카카오할지', {widget: 'chatkakaobutton'}
        );
        // const botMessagesecond = createChatBotMessage('얼마를 빌려주시나요?', {
        //   delay: 900,
        // });
        
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, clientmessage, botMessage],
        }));
        
    }
  };

  // 빌림
  const handleIBorrow = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
    if (!userButtons[0]) {
      isLender = false
      userButtons.push('iBorrow')
      localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
      const clientmessage = createClientMessage('빌리기');
      const botMessage = createChatBotMessage(
        '대화형할지 카카오할지', {widget: 'chatkakaobutton'}
        );
        // const botMessagesecond = createChatBotMessage('얼마를 빌려주시나요?', {
        //   delay: 900,
        // });
        
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, clientmessage, botMessage],
        }));
        
    }
  };

  // 대화형 작성
  const handleChatCreate = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
    if (!userButtons[1]) {
      userButtons.push('createwithChat')
      localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
      const clientmessage = createClientMessage('휙봇과 대화로 작성');
      const botMessage = createChatBotMessage('얼마를 빌려주시나요?', { delay: 900 }
        );
        // const botMessagesecond = createChatBotMessage('얼마를 빌려주시나요?', {
        //   delay: 900,
        // });
        
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, clientmessage, botMessage],
        }));
        
    }
  };

  // 카카오캡쳐 작성
  const handleKakaoCreate = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
    if (!userButtons[1]) {
      userButtons.push('createwithChat')
      localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
      localStorage.setItem("kakaoUploaded", 'false')
      const clientmessage = createClientMessage('카카오톡 캡처로 작성', { widget: 'userimageupload', delay: 900 });
        
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, clientmessage ],
      }));
        
    }
  };

  // 카카오캡쳐 업로드
  const handleUpload = () => {
    if (localStorage.getItem('kakaoUploaded') == 'false') {
      const botMessage = createChatBotMessage('만들어 드리겠습니다!');
      // 여기서 이미지 보내고 내용 받기
      // const toSend = JSON.parse(localStorage.getItem('tempContractLocal'));

      // 더미데이터
      const toSend = {
        loanAmount: 120,
        maturityDate: '20240101',
        interestRate: 12,
      };
      localStorage.setItem("tempContractLocal", JSON.stringify(toSend))



      var date = new Date();
      var borrowedYear = date.getFullYear();
      var borrowedMonth = ('0' + (1 + date.getMonth())).slice(-2);
      var borrowedDay = ('0' + date.getDate()).slice(-2);
      var borrowedDate = borrowedYear + borrowedMonth + borrowedDay;

      localStorage.setItem("kakaoUploaded", 'true')
      
      const botMessageSecond = createChatBotMessage(
        `금액: ${toSend.loanAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
      시작일: ${borrowedDate.slice(0, 4)}년 ${borrowedDate.slice(
        4,
        6,
      )}월 ${borrowedDate.slice(6, 8)}일
      만기일: ${toSend.maturityDate.slice(0, 4)}년 ${toSend.maturityDate.slice(
        4,
        6,
      )}월 ${toSend.maturityDate.slice(6, 8)}일
      이자율: ${toSend.interestRate}%\n
      위 내용이 맞나요`,
        { widget: 'confirmbutton', delay: 900 },
      );;

      const toSendContract = { isLender: isLender, loanAmount: toSend.loanAmount, maturityDate: toSend.maturityDate, interestRate: toSend.interestRate }
      localStorage.setItem("toSendLocal", JSON.stringify(toSendContract))
      // 여기서 이미지 POST, 정보 GET
      
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage, botMessageSecond],
      }));
    }

    
    
  };

  // 금액 형식 맞지않음
  const priceFailed = () => {
    const botMessage = createChatBotMessage('금액을 숫자로 입력해주세요');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 금액 0이하
  const lessThanZero = () => {
    const botMessage = createChatBotMessage('금액은 0이상이어야 합니다');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 만기일
  const endDate = () => {
    const botMessage = createChatBotMessage('만기일은 언제로 할까요?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 날짜 형식 안맞음
  const dateFailed = () => {
    const botMessage = createChatBotMessage('정확한 날짜를 입력해주세요');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 만기일이 오늘 이하임
  const endDateFailed = () => {
    const botMessage = createChatBotMessage(
      '만기일은 시작일보다 뒤\n만기일 다시',
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 이자율
  const annualRate = () => {
    const botMessage = createChatBotMessage('이자율은 몇%로 하시겠습니까?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 이자율 형식 안맞음
  const maxRate = () => {
    const botMessage = createChatBotMessage('법정 최고 이자율은 20%입니다');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 이자율 형식 안맞음
  const rateFailed = () => {
    const botMessage = createChatBotMessage('이자율을 숫자로');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // 내용확인
  const contractConfirm = (toSend, borrowedDate) => {
    const botMessage = createChatBotMessage(
      `금액: ${toSend.loanAmount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
    시작일: ${borrowedDate.slice(0, 4)}년 ${borrowedDate.slice(
      4,
      6,
    )}월 ${borrowedDate.slice(6, 8)}일
    만기일: ${toSend.maturityDate.slice(0, 4)}년 ${toSend.maturityDate.slice(
      4,
      6,
    )}월 ${toSend.maturityDate.slice(6, 8)}일
    이자율: ${toSend.interestRate}%\n
    위 내용이 맞나요`,
      { widget: 'confirmbutton' },
    );

    const toSendContract = { isLender: isLender, loanAmount: toSend.loanAmount, maturityDate: toSend.maturityDate, interestRate: toSend.interestRate }
    localStorage.setItem("toSendLocal", JSON.stringify(toSendContract))
    
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  
  // 내용 맞음
  const handleYesConfirmButton = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
      if (!userButtons[2]) {
        userButtons.push('handleConfirm')
        localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
        const clientmessage = createClientMessage('맞아용');
        const botMessage = createChatBotMessage('위의 내용으로 만들어드릴게요');
        const botMessageSecond = createChatBotMessage(
        '작성된 임시 차용증을 확인해보세요',
        { widget: 'finalconfirmbutton', delay: 1600 },
        );
        
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, clientmessage, botMessage, botMessageSecond],
        }));
      }
    };
    
    // 내용 틀림
    const handleNoConfirmButton = () => {
      const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
      if (!userButtons[2]) {
        userButtons.push('handleConfirm')
        localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
        const clientmessage = createClientMessage('아니에용');
        const botMessage = createChatBotMessage(
          "수정하고 싶은 항목을 선택해주세요\n다시 작성하려면 '처음으로'", { widget: 'editbutton' }
        );
    
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, clientmessage, botMessage],
        }));
      }
    };


    // 금액 수정
  const handlePriceEdit = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
    if (!userButtons[3]) {
      userButtons.push('handlePriceEdit')
      localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
      const clientmessage = createClientMessage('금액');
      const botMessage = createChatBotMessage('수정할 금액을 입력해주세요', { delay: 900 });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, clientmessage, botMessage ],
      }));
    }
  };

  // 만기일 수정
  const handleDateEdit = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
    if (!userButtons[3]) {
      userButtons.push('handleDateEdit')
      localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
      const clientmessage = createClientMessage('만기일');
      const botMessage = createChatBotMessage('수정할 만기일을 입력해주세요', { delay: 900 });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, clientmessage, botMessage ],
      }));
    }
  };

  // 이자율 수정
  const handleRateEdit = () => {
    const userButtons = JSON.parse(localStorage.getItem('userButtonsLocal'));
    if (!userButtons[3]) {
      userButtons.push('handleRateEdit')
      localStorage.setItem("userButtonsLocal", JSON.stringify(userButtons))
      const clientmessage = createClientMessage('이자율');
      const botMessage = createChatBotMessage('수정할 이자율을 입력해주세요', { delay: 900 });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, clientmessage, botMessage ],
      }));
    }
  };


  const goToPage = () => {
    const navigate = useNavigate();
    navigate("/contractTemp")
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            startAfterButton,
            toFirst,
            handleILend,
            handleIBorrow,
            handleChatCreate,
            handleKakaoCreate,
            handleUpload,
            lessThanZero,
            priceFailed,
            dateFailed,
            endDate,
            endDateFailed,
            annualRate,
            maxRate,
            rateFailed,
            contractConfirm,
            handleYesConfirmButton,
            handleNoConfirmButton,
            handlePriceEdit,
            handleDateEdit,
            handleRateEdit,
            goToPage
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
