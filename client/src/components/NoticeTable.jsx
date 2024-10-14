import React from "react";
import NoticeTableRows from "./NoticeTableRows";

const NoticeTable = ({ notices, hospitals, onDelete, onUpdate }) => {
    return (
        <table className="w-full">
        <thead>
            <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
            <th className="pb-4 pr-10">ID</th>
            <th className="pb-4 pr-10">Hospital</th>
            <th className="pb-4 pr-20">Date</th>
            <th className="pb-4 pr-10">Title</th>
            <th className="pb-4">Description</th>
            <th className="pb-4"></th>
            </tr>
        </thead>
        <tbody>
            {notices && notices.map((notice) => (
            <NoticeTableRows 
                key={notice.id} 
                notice={notice} 
                hospitals={hospitals}
                onDelete={onDelete} 
                onUpdate={onUpdate} 
            />
            ))}
        </tbody>
        </table>
    );
}

export default NoticeTable;