import Default from "../components/layouts/Default"
import Login from "../components/forms/Login"
import { useUser } from "../context/userContext";
import Link from "next/link"

export default function Home() {

  const { user } = useUser()
  return (
    <div>
      <Default>
        {!user &&
          <div>
            <Login />
          </div>}

        <div>
          {user &&
            <div>
              <h1 className="text-3xl font-bold text-red-400 my-5 text-center">Bienvenue {user.username} ! </h1>
              <div className="flex bg-red-400">
                <img src="https://hifi-project.com/wp-content/uploads/2020/02/categorie-vinyle.png" className="w-2/4"/>
                <div className="flex flex-col w-2/4 items-center justify-center">
                  <h2 className="text-4xl font-black text-center">Nouveautés !</h2>
                  <Link href="/products" >
                    <button className="bg-black text-white font-black text-xl py-3 w-2/3 mx-auto mt-5"> Je découvre</button></Link>
                </div>
                </div>
            </div>
          }
        </div>
      </Default>
    </div>
  )
}