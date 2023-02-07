export const QUIZ_REPORT_TYPE = [
    {ENG: "UNRELATED_PICTURE", KOR: "관련 없는 사진"},
    {ENG: "INAPPROPRIATE_PICTURE", KOR: "부적절한 사진"},
    {ENG: "INAPPROPRIATE_TITLE", KOR: "부적절한 제목"},
    {ENG: "INAPPROPRIATE_TAG", KOR: "부적절한 태그"},
    {ENG: "ETC", KOR: "기타"}
]
export const COMMENT_REPORT_TYPE = [
    {ENG: "SPAM_COMMENT", KOR: "원치 않는 상업성 콘텐츠 또는 스팸"},
    {ENG: "PORN_COMMENT", KOR: "포르노 또는 음란물"},
    {ENG: "CHILD_ABUSE_COMMENT", KOR: "아동 학대"},
    {ENG: "VIOLATION_COMMENT", KOR: "괴롭힘 또는 폭력"},
    {ENG: "TERROR_COMMENT", KOR: "테러 조장"},
    {ENG: "SUICIDE_COMMENT", KOR: "자살 또는 자해"},
    {ENG: "WRONG_INFO_COMMENT", KOR: "잘못된 정보"}
]

export const TARGET_TYPE = {
    QUIZ : "QUIZ", COMMENT : "COMMENT"
}

export const GRAPH_TYPE = {
    MEMBER : {
        eng : "members",
        kor : "회원"
    },
    QUIZ : {
        eng : "quiz",
        kor : "퀴즈"
    },
    COMMENT : {
        eng : "comments",
        kor : "댓글"
    },
    REPORT : {
        eng : "reports",
        kor : "신고"
    }
}