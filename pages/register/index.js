import axios from 'axios';
import React from 'react';
import Default from '../../components/layouts/Default'
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useUser } from '../../context/userContext';
import Link from 'next/link'

export default function Login() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { user, setToken } = useUser()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {

        console.log(data)
        axios.post('http://localhost:5000/users', data)
            .then((res) => {
                console.log(res)
                if (res.status != 201) {
                    enqueueSnackbar('Error')
                    console.log(errors);
                } else {
                    enqueueSnackbar('User created')
                }

            })
    };

    return (
        <Default>
             <div
      class="
      flex flex-col
      bg-white
      shadow-md
      px-4
      sm:px-6
      md:px-8
      lg:px-10
      py-8
      rounded-3xl
      w-50 mx-auto my-5
      max-w-md
    "
    >
      <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
        Inscription
      </div>
      <div class="mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="flex flex-col mb-5">
            <label
              for="email"
              class="mb-1 text-xs tracking-wide text-gray-600"
            >E-Mail Address:
            </label>
            <div class="relative">
              <div
                class="
                inline-flex
                items-center
                justify-center
                absolute
                left-0
                top-0
                h-full
                w-10
                text-gray-400
              "
              >
                <i class="fas fa-at text-blue-500"></i>
              </div>

              <input
                id="email"
                type="text"
                name="email"
                class="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                placeholder="Votre pseudo"
                {...register("username", { required: true, maxLength: 80 })}
              />
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <label
              for="password"
              class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >Password:
            </label>
            <div class="relative">
              <div
                class="
                inline-flex
                items-center
                justify-center
                absolute
                left-0
                top-0
                h-full
                w-10
                text-gray-400
              "
              >
                <span>
                  <i class="fas fa-lock text-blue-500"></i>
                </span>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                {...register("password", { required: true, min: 3 })}
                class="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div class="flex w-full">
            <button
              type="submit"
              class="
              flex
              mt-2
              items-center
              justify-center
              focus:outline-none
              text-white text-sm
              sm:text-base
              bg-blue-500
              hover:bg-blue-600
              rounded-2xl
              py-2
              w-full
              transition
              duration-150
              ease-in
            "
            >
              <span class="mr-2 uppercase">Inscription</span>
              <span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </button>
            
          </div>
          <div className="flex justify-center items-center mt-6">
              <p
                className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
              >
                <span className="ml-2"
                >Vous avez un compte ?
                  <Link
                    href="/"
                    
                  ><p className="text-xs ml-2 text-blue-500 font-semibold cursor-pointer">Se connecter</p>
                  </Link>
                  </span>
              </p>
            </div>
        </form>
      </div>
    </div>
        </Default>
    );
}