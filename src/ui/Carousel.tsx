import NextSlideIcon from '@/assets/icons/next-slide.svg?react';
import { purple, slate, white } from '@/styles/colors';
import { Button } from '@/ui/Button';
import Column from '@/ui/Column';
import Row from '@/ui/Row';
import { css, Interpolation, Theme } from '@emotion/react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type CarouselProps = {
  carouselCssStyle?: Interpolation<Theme>;
  children: React.ReactElement[];
  withPagination?: boolean;
};

type CarouselContextState = {
  slidesCount: number;
  setSlidesCount: (slidesCount: number) => void;
  nextSlide: () => void;
  canGoToNextSlide: boolean;
  prevSlide: () => void;
  canGoToPrevSlide: boolean;
  activeSlideIndex: number;
  setActiveSlideIndex: (activeSlideIndex: number) => void;
};

type CarouselProviderProps = React.PropsWithChildren<unknown>;

export const CarouselContext = createContext({} as CarouselContextState);

export const useCarousel = () => useContext(CarouselContext);

export const CarouselProvider = ({ children }: CarouselProviderProps) => {
  const [slidesCount, setSlidesCount] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (activeSlideIndex < slidesCount - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    } else if (activeSlideIndex === slidesCount - 1) {
      setActiveSlideIndex(0);
    }
  }, [slidesCount, activeSlideIndex, setActiveSlideIndex]);

  const canGoToNextSlide = useMemo(
    () => activeSlideIndex < slidesCount - 1,
    [slidesCount, activeSlideIndex]
  );

  const prevSlide = useCallback(() => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    } else if (activeSlideIndex === 0) {
      setActiveSlideIndex(slidesCount - 1);
    }
  }, [slidesCount, activeSlideIndex, setActiveSlideIndex]);

  const canGoToPrevSlide = useMemo(
    () => activeSlideIndex > 0,
    [activeSlideIndex]
  );

  const value = useMemo(
    () => ({
      slidesCount,
      setSlidesCount,
      activeSlideIndex,
      setActiveSlideIndex,
      nextSlide,
      canGoToNextSlide,
      prevSlide,
      canGoToPrevSlide,
    }),
    [
      slidesCount,
      setSlidesCount,
      activeSlideIndex,
      setActiveSlideIndex,
      nextSlide,
      canGoToNextSlide,
      prevSlide,
      canGoToPrevSlide,
    ]
  );

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

export const Carousel = ({
  carouselCssStyle,
  children,
  withPagination,
}: CarouselProps) => {
  const {
    slidesCount,
    setSlidesCount,
    prevSlide,
    nextSlide,
    activeSlideIndex,
  } = useCarousel();

  useEffect(() => {
    setSlidesCount(children.length);
  }, [children]);

  return (
    <Row css={[carouselStyle, carouselCssStyle]}>
      <Column>
        <div
          css={carouselContainerStyle}
          style={{
            transform: `translate3d(${-activeSlideIndex * 100}%, 0, 0)`,
          }}
        >
          <>
            {children.map((child, index) => (
              <Row key={`slide${index}`} css={carouselItemStyle}>
                {child}
              </Row>
            ))}
          </>
        </div>
        {withPagination && <CarouselPagination />}
        {slidesCount > 1 && (
          <Row cssStyle={navButtonsContainerStyle}>
            <Button
              cssStyle={navButtonStyle({ direction: 'left' })}
              onClick={prevSlide}
              variant="ghost"
            >
              <NextSlideIcon />
            </Button>
            <Button
              cssStyle={navButtonStyle({ direction: 'right' })}
              onClick={nextSlide}
              variant="ghost"
            >
              <NextSlideIcon />
            </Button>
          </Row>
        )}
      </Column>
    </Row>
  );
};

export const CarouselPagination = () => {
  const { slidesCount, activeSlideIndex, setActiveSlideIndex } = useCarousel();

  const handleDotClick = (slideIndex: number) => {
    setActiveSlideIndex(slideIndex);
  };

  if (!slidesCount) {
    return null;
  }

  return (
    <div css={paginationStyle}>
      {Array.from({ length: slidesCount }).map((_, index) => (
        <button
          key={`dot-${index}`}
          css={paginationItemStyle({ active: activeSlideIndex === index })}
          onClick={() => handleDotClick(index)}
        />
      ))}
    </div>
  );
};

const carouselStyle = css({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 15,
  background: slate,
  color: white,
});

const carouselContainerStyle = css({
  display: 'flex',
  whiteSpace: 'nowrap',
  transition: 'ease 1000ms',
  margin: '0 auto',
  width: '100%',
});

const carouselItemStyle = css({
  display: 'flex',
  whiteSpace: 'normal',
  width: '100%',
  flexShrink: 0,
  alignItems: 'stretch',
});

const paginationStyle = css({
  display: 'flex',
  marginTop: 10,
  alignSelf: 'center',
});

const paginationItemStyle = ({ active = false }: { active: boolean }) =>
  css({
    width: 35,
    height: 5,
    borderRadius: 2.5,
    margin: '0 5px',
    background: '#d9d9d9',
    cursor: 'pointer',
    ...(active && { background: purple }),
  });

const navButtonsContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  padding: '0 18px',
  pointerEvents: 'none',
});

const navButtonStyle = ({ direction }: { direction: 'left' | 'right' }) =>
  css({
    backgroundColor: white,
    borderRadius: '50%',
    width: 43,
    height: 43,
    border: '1px solid #000',
    padding: 0,
    justifyContent: 'center',
    pointerEvents: 'auto',
    ...(direction === 'right' && {
      svg: {
        transform: 'rotate(180deg)',
      },
    }),
  });
