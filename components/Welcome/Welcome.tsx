import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          PawsConnect
        </Text>
      </Title>
      <Text color="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
      The goal of this project is to develop an innovative social media platform, called PawsConnect, tailored 
      for pet parents, envisioned as a web/mobile application to facilitate a vibrant community where pet 
      enthusiasts can connect, share, and learn more about their furry friends. {' '}
        <Anchor href="https://github.com/anishparulekar972/PawsConnect" size="lg">
          this guide
        </Anchor>
        . Have FUN.
        <br />
          Anish Parulekar & Ibrahim Cheena
      </Text>
    </>
  );
}
