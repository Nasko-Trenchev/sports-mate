import classes from './PageContent.module.css';

const PageContent: React.FC<{ title: string, children: React.ReactNode }> = (props) => {
    return (
        <div className={classes.content}>
            <h1>{props.title}</h1>
            {props.children}
        </div>
    );
}

export default PageContent;