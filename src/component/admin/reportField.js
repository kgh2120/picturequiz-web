import {Form, Modal} from "react-bootstrap";

export default function ReportField({context}) {
    return <>
        <Modal.Title>접수 내용</Modal.Title>
        <hr/>
        {
            context.map(r => {
                return <div className={"flex-box justify-content-between mt-3"}>
                    <Form.Control className={"mb-3 col-9"} value={`${r.name}`} readOnly={true}/>
                    <Form.Control className={"col-2"} type={"number"} value={r.count} readOnly={true}/>
                </div>
            })
        }
    </>;
}