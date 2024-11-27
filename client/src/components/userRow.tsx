import { CiMenuKebab } from "react-icons/ci";
import {
  MdAirplanemodeInactive,
  MdOutlineAirplanemodeActive,
  MdOutlineDelete,
} from "react-icons/md";
import { IUser } from "../types/user";
import { memo, useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import roles from "../data/roles.json";
import { GiCheckMark } from "react-icons/gi";

interface IUserRowProps extends IUser {
  index: number;
}

function UserRow({ name, email, role, status, index }: IUserRowProps) {
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [edit, setEdit] = useState(false);
  const userMenu = useRef<HTMLSpanElement>(null);
  function closeMenu(e: any) {
    if (toggleHamburger && !userMenu.current?.contains(e.target)) {
      setToggleHamburger(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, [userMenu, closeMenu]);

  return (
    <tr
      className={`border  font-semibold transition-all border-zinc-800  rounded-md text-sm lg:text-lg  ${
        !edit && "hover:bg-zinc-800"
      }`}
    >
      <td className=" p-2">
        <div className="flex flex-col gap-1">
          {edit ? (
            <>
              <input
                type="text"
                defaultValue={name}
                className="bg-transparent w-full outline-none h-full border rounded-sm p-3"
              />
              <p className="truncate md:hidden">
              <input
                type="text"
                defaultValue={email}
                className="bg-transparent w-full outline-none h-full border rounded-sm p-3"
              />
              </p>
            </>
          ) : (
            <>
              <span className="flex gap-2 items-center">
                <p className="text-nowrap text-sm lg:text-lg">{name}</p>
                <span
                  className={`text-xs opacity-90 font-bold border border-zinc-700 h-fit px-2 rounded-md ${
                    status == "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status}
                </span>
              </span>
              <p className="truncate text-sm text-zinc-400 md:hidden">
                {email}
              </p>
            </>
          )}
        </div>
      </td>
      <td className="hidden md:table-cell p-1">
        <div className="w-full h-full">
          {edit ? (
            <input
              type="text"
              defaultValue={email}
              className="bg-transparent w-full outline-none h-full border rounded-sm p-3"
            />
          ) : (
            email
          )}
        </div>
      </td>
      <td className="">
        <div className="w-full h-full">
          {edit ? (
            <select className="appearance-none row-start-1 col-start-1 bg-transparent w-full outline-none h-full border rounded-sm p-2">
              {roles.map((r) => (
                <option
                  value={r?.name}
                  selected={r?.name == role}
                  className="bg-black"
                >
                  {r?.name}
                </option>
              ))}
            </select>
          ) : (
            role
          )}
        </div>
      </td>
      <td className=" whitespace-nowrap text-center p-1">
        <div className=" w-full">
          {edit ? (
            <button
              type="button"
              className="p-2 h-fit transition bg-green-600 rounded-full "
              onClick={() => setToggleHamburger(!toggleHamburger)}
            >
              <GiCheckMark />
            </button>
          ) : (
            <button
              type="button"
              className="p-1 h-fit transition bg-zinc-700 rounded-sm "
              onClick={() => setToggleHamburger(!toggleHamburger)}
            >
              <CiMenuKebab />
            </button>
          )}
        </div>
        {toggleHamburger && (
          <span
            ref={userMenu}
            role="dialog"
            id=":rg:"
            tabIndex={-1}
            style={{
              position: "absolute",
              transform: `translate(0,${45 * (index + 1)}px)`,
            }}
            className={`border border-zinc-800 top-5 right-12 lg:right-20 z-40 max-w-sm rounded-md bg-black p-2 shadow-medium transition-all duration-300 text-md`}
          >
            <button
              type="button"
              onClick={() => setEdit(true)}
              className="w-full flex items-center gap-2 y-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              <FiEdit2 />
              <p>Edit</p>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 py-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              {status == "Active" ? (
                <MdAirplanemodeInactive />
              ) : (
                <MdOutlineAirplanemodeActive />
              )}
              <p>
                Set as
                {status == "Active" ? " Inactive" : " Active"}
              </p>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-2 y-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              <MdOutlineDelete />
              <p>Delete</p>
            </button>
          </span>
        )}
      </td>
    </tr>
  );
}

export default memo(UserRow);
