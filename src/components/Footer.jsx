import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <aside>

                <Logo size={"m"} />
                <p>
                    Providing gyms at your convinience since 2024
                </p>
            </aside>

            <nav className='flex justify-evenly sm:justify-end '>
                <h6 className="footer-title">Social</h6>
                <div className="">
                    <Link to="">
                        <FaTwitter size={22} className='text-wwTitleRed' />
                    </Link>
                    <Link to="">
                        <FaYoutube size={25} className='text-wwTitleRed' />
                    </Link>
                    <Link to="">
                        <FaFacebookF size={25} className='text-wwTitleRed' />
                    </Link>
                </div>
            </nav>

        </footer>
    )
}

export default Footer
