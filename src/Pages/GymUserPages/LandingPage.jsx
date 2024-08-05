import React from 'react'
import { Link } from 'react-router-dom'

// there is className called width-change in this File. we need to increase its width to make the page more appealing

function LandingPage() {
  return (

    <div className="pb-10 bg-grey-900">
      {/* section 1 */}
      <div className="relative px-6 isolate pt-14 lg:px-8">
        {/* hidden area  */}
        <div className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(40%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#b91c1c] to-[#e72222] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
        </div>

        <div className="max-w-2xl py-32 mx-auto lg:py-40">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-red-700 sm:text-5xl">Your Workout Companion !</h1>
            <p className="mt-6 text-lg leading-8 text-center text-wwtext">Your lifestyle demands flexibility, convenience, and a sense of community, no matter where in the world you find yourself. That’s why we’ve created a gym experience tailored just for you.</p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <Link to="/register" className=" bg-wwred px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</Link>
              <Link to="/search" className="text-sm font-semibold leading-6 text-wwtext">Browse Gyms <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>

        {/* hidden area
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#212121] to-[#212121] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
        </div> */}

      </div>

      {/* section 2 */}
      <div className="relative px-6 pt-2 isolate md:mt-16 lg:px-8 md:mb-12">
        <div className="max-w-2xl py-8 mx-auto lg:py-8">
          <div className="width-change">
            <h1 className="text-2xl font-bold tracking-tight text-center text-red-700 sm:text-2xl ">
              Explore all types of Workout
            </h1>
            <p className="flex flex-col mt-6 leading-8 align-top text-wwtext lg:items-start lg:justify-start ">
              <span className='w-full text-center'>Step by Step to Success</span>
              <span className='w-full text-center'>Select Your Favorite Exercise Type or Try Them All! 😁</span>
            </p>

            {/* menu for larger screen */}
            <div className='items-center justify-between mt-10 lg:flex gap-x-6'>
              <Link to="#" className="inline-block m-1">
                <button className="bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full w-36 mb-2 text-center border border-wwred">
                  WeightLifting
                </button>
              </Link>

              <Link to="#" className="inline-block m-1">
                <button className="bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full w-36 mb-2 text-center border border-wwred">
                  Calisthenics
                </button>
              </Link>

              <Link to="#" className="inline-block m-1">
                <button className="bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full w-36 mb-2 text-center border border-wwred">
                  Gymnastics
                </button>
              </Link>

              <Link to="#" className="inline-block m-1">
                <button className="bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full w-36 mb-2 text-center border border-wwred">
                  Yoga
                </button>
              </Link>

              <Link to="#" className="inline-block m-1">
                <button className="bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full w-36 mb-2 text-center border border-wwred">
                  Cardio
                </button>
              </Link>
            </div>



          </div>
        </div>
      </div>


      {/* secttion 3 */}
      <div className="relative px-6 mb-12 isolate lg:px-8">
        <div className="max-w-2xl py-8 mx-auto lg:py-8">
          <div className="flex items-center justify-between width-change">

            <p className="flex flex-col mt-6 text-2xl leading-8 text-left align-top text-wwTitleRed lg:items-start lg:justify-start ">
              <span className='w-full font-bold '>Are You A Gym Owner ? </span>
              <span className='w-full '>Expand Your Reach. Attract digital nomads </span>
            </p>

            {/* Button For Gym Owner to enroll*/}
            <div className='items-center justify-between mt-10 lg:flex gap-x-6'>
              <Link to="" className="inline-block m-1">
                <button className="bg-transparent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-wwred focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:w-full w-40 mb-2 text-center border border-wwred">
                  Enroll Now
                </button>
              </Link>


            </div>



          </div>
        </div>
      </div>

      {/* secttion 4 */}

      <div className="relative flex flex-col px-6 pt-2 sm:flex-row isolate lg:px-8">

        <div className="w-auto p-4 bg-gray-700 sm:w-3/5 ">

          Space For Image
          <img src="../../assets/profileP.png"/>
        </div>


        <div className="grid w-3/5 grid-cols-1 gap-4 p-4 text-left sm:w-2/5 text-wwTitleRed">
          <div className="text-2xl font-semibold">Trusted by proffesionals</div>
          <div className="py-4 ">Join the community of professionals enjoying seamless and reliable gym booking experiences.</div>

          {/* I want this to be hidden for smaller screen but !important thing is stopping it. Need to fix this  dev/muhmmad*/}
          <div className="md:pt-20 ">
            WorkoutWings has revolutionized my fitness routine! As someone who travels frequently, finding a gym and booking a slot has never been easier.
          </div>

          <div className="flex flex-col justify-start py-4 md:flex-row">
            <span className='flex items-center justify-center mb-2 ml-8 mr-2 rounded-full bg-slate-300 md:ml-0 md:mb-0 w-7 h-7 '>DP</span>
            <span className='flex items-center justify-center '>
              Yash Patil,  Working out with WorkoutWings
            </span>
          </div>
        </div>
      </div>


    </div >
  )
}

export default LandingPage
