function Footer() {
    const currentYear = new Date().getFullYear();//круто!)
    return(
        <footer className="footer">
            <p className="footer__copyright"> &copy; {`${currentYear} Mesto Russia`}</p>
        </footer>
    );
}

export default Footer;