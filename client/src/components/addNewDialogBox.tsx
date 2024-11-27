import { FaXmark } from "react-icons/fa6";
import useAppProvider from "../provider/hook";
import { memo, useState } from "react";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

export default function AddNewDialogBox() {
  const uAppProvider = useAppProvider();
  return (
    <section className="text-white transition-all absolute bg-black/80 inset-0 w-dvh h-dvh flex items-center justify-center z-40">
      <div className="relative transition-all min-w-80 max-w-80 lg:max-w-96 flex flex-col gap-2 bg-black p-5 border border-zinc-800 rounded-sm">
        <span className=" relative w-full flex flex-col justify-end items-end">
          <button
            onClick={() => uAppProvider?.setToggleAddNew(false)}
            className="transition-all p-1 hover:bg-zinc-800 rounded-md"
          >
            <FaXmark />
          </button>
          <h1 className=" w-full text-center font-bold">
            Add new {uAppProvider?.toggleMenu}
          </h1>
        </span>
        {uAppProvider?.toggleMenu == "user" ? <AddNewUser /> : <AddNewRole />}
      </div>
    </section>
  );
}

const AddNewUser = memo(function AddNewUser() {
  const uAppProvider = useAppProvider();
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleAddUser() {
    try {
      if (!data?.email || !data?.name || !data?.role) {
        return alert("Please fill all the details");
      }
      setLoading(true);
      const user = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URl}/user`,
        data
      );
      setLoading(false);
      if (!user?.data?.success) {
        return alert(user?.data?.error);
      }
      uAppProvider?.setUsers([])
      uAppProvider?.setToggleAddNew(false);
      return alert("User added successfully");
    } catch (error) {
      return alert("Internal Server error");
    }
  }
  return (
    <>
      <span className="grid grid-cols-[auto_minmax(100px,_1fr)]">
        <span className="flex flex-col gap-2">
          <label htmlFor="namef" className="p-2 ">
            Name
          </label>
          <label htmlFor="emailf" className=" p-2 ">
            Email
          </label>
          <label htmlFor="rolef" className="p-2 ">
            Role
          </label>
        </span>
        <span className="flex flex-col gap-2">
          <input
            type="text"
            id="namef"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Enter value"
            className="bg-transparent w-full outline-none h-full border border-zinc-800 rounded-sm p-2"
          />

          <input
            type="email"
            id="emailf"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter value"
            className="bg-transparent w-full outline-none h-full border border-zinc-800 rounded-sm p-2"
          />

          <select
            id="rolef"
            defaultValue={"null"}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            className="appearance-none row-start-1 col-start-1 bg-black w-full outline-none h-full border border-zinc-800 rounded-sm p-2"
          >
            <option value="null" className="p-4" key={"select"} disabled>
              Select
            </option>
            {uAppProvider?.roles?.map((r) => (
              <option key={r?._id} value={r?.name}>
                {r?.name}
              </option>
            ))}
          </select>
        </span>
      </span>
      <span className="flex w-full justify-center mt-4">
        <button
          type="button"
          disabled={loading}
          onClick={handleAddUser}
          className="bg-white text-black font-semibold px-2 py-1 rounded-sm"
        >
          {!loading ? (
            "Add User"
          ) : (
            <CgSpinner className="animate-spin text-xl" />
          )}
        </button>
      </span>
    </>
  );
});

const AddNewRole = memo(function AddNewRole() {
  const uAppProvider = useAppProvider();
  const [data, setData] = useState<{ name: string; permissions: string[] }>({
    name: "",
    permissions: [],
  });
  const [loading, setLoading] = useState(false);

  async function handleAddRole() {
    try {
      if (!data?.name || data?.permissions.length == 0) {
        return alert("Please fill all the details");
      }
      setLoading(true)
      const role = await axios.post(`${import.meta.env.VITE_SERVER_API_URl}/role`,data)
      setLoading(false)
      if(!role?.data?.success){
        return alert(role?.data?.error)
      }
      uAppProvider?.setRoles([])
      uAppProvider?.setToggleAddNew(false)
      return alert("Role added successfully")
    } catch (error) {
      return alert("Internal Server error")
    }
  }

  function handleCheckboxChange(permission: string) {
    var newPermissions = [...data?.permissions, permission];
    if (data?.permissions?.includes(permission)) {
      newPermissions = data?.permissions?.filter((p) => p != permission);
    }
    return setData({
      ...data,
      permissions: newPermissions,
    });
  }
  
  return (
    <>
      <span className="grid grid-cols-[auto_minmax(100px,_1fr)]">
        <span className="flex flex-col gap-2">
          <label htmlFor="namef" className="p-2 ">
            Name
          </label>
          <label className=" p-2 ">Permissions</label>
        </span>
        <span className="flex flex-col gap-2">
          <input
            type="text"
            id="namef"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Enter value"
            className="bg-transparent w-full outline-none h-full border border-zinc-800 rounded-sm p-2"
          />
          <span className="flex gap-2 p-2">
            <span className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="readf"
                onChange={() => handleCheckboxChange("Read")}
              />
              <label htmlFor="readf">Read</label>
            </span>
            <span className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="writef"
                onChange={() => handleCheckboxChange("Write")}
              />
              <label htmlFor="writef">Write</label>
            </span>
            <span className="flex gap-2">
              <input
                type="checkbox"
                name=""
                id="deletef"
                onChange={() => handleCheckboxChange("Delete")}
              />
              <label htmlFor="deletef">Delete</label>
            </span>
          </span>
        </span>
      </span>
      <span className="flex w-full justify-center mt-4">
        <button
          type="button"
          disabled={loading}
          onClick={handleAddRole}
          className="bg-white text-black font-semibold px-2 py-1 rounded-sm"
        >
          {!loading ? (
            "Add Role"
          ) : (
            <CgSpinner className="animate-spin text-xl" />
          )}
        </button>
      </span>
    </>
  );
});
