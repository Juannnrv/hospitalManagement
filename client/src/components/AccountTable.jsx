import React from "react";
import AccountTableRow from "./AccountTableRow";

const AccountTable = ({ accounts, patients, hospitals, onDelete, onUpdate }) => {
    return (
        <table className="w-full">
            <thead>
                <tr className="text-left bg-color-7 px-5 py-3 text-black opacity-45 text-[12px] font-poppins font-semibold">
                    <th className="pb-4 pr-10">ID</th>
                    <th className="pb-4 pr-10">Patient</th>
                    <th className="pb-4 pr-10">Hospital</th>
                    <th className="pb-4 pr-20">Date</th>
                    <th className="pb-4 pr-10">Amount</th>
                    <th className="pb-4">Description</th>
                    <th className="pb-4"></th>
                </tr>
            </thead>
            <tbody>
                {accounts && accounts.map((account) => (
                    <AccountTableRow 
                        key={account.id} 
                        account={account} 
                        patients={patients}
                        hospitals={hospitals}
                        onDelete={onDelete} 
                        onUpdate={onUpdate} 
                    />
                ))}
            </tbody>
        </table>
    );
}

export default AccountTable;