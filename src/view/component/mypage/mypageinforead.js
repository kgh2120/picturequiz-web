export default function Mypageinforead({id, nickname, mail}) {
    return <>
        <div className={"my-page_content_area"}>
            <div className={"my-page_content"}>
                <span className={"my-page_content_label"}>아이디</span>
                <div className={"my-page_content_input"}>{id}</div>
            </div>

            <div className={"my-page_content"}>
                <span className={"my-page_content_label"}>닉네임</span>
                {
                    nickname !== null ?
                        <div className={"my-page_content_input"}>{nickname}</div> :
                        <div className={"my-page_content_input page_content_input_not_setting"}>닉네임이 설정되어 있지
                            않습니다.</div>
                }
            </div>
            <div className={"my-page_content"}>
                <span className={"my-page_content_label"}>인증 메일</span>

                {
                    mail !== null ?
                        <div className={"my-page_content_input"}>{mail}</div> :
                        <div className={"my-page_content_input page_content_input_not_setting"}>인증 메일이 설정되어있지
                            않습니다.</div>
                }
            </div>
        </div>
    </>
};